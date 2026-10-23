from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.core.pricing import calculate_unit_price
from app.db.session import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter()


@router.post("/", response_model=OrderOut, status_code=201)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    order = Order(
        customer_name=payload.customer_name.strip(),
        customer_phone=payload.customer_phone.strip(),
        note=payload.note,
        total=Decimal("0.00"),
    )
    total = Decimal("0.00")

    for requested in payload.items:
        product = (
            db.query(Product)
            .options(joinedload(Product.category))
            .filter(Product.id == requested.product_id, Product.available.is_(True))
            .first()
        )
        if product is None:
            raise HTTPException(
                status_code=404,
                detail=f"Product {requested.product_id} not found or unavailable",
            )
        try:
            unit_price = calculate_unit_price(product, requested.customizations)
        except ValueError as exc:
            raise HTTPException(status_code=422, detail=str(exc)) from exc

        total += unit_price * requested.quantity
        order.items.append(
            OrderItem(
                product_id=product.id,
                product_name=product.name,
                quantity=requested.quantity,
                unit_price=unit_price,
                customizations=requested.customizations,
            )
        )

    order.total = total.quantize(Decimal("0.01"))
    db.add(order)
    db.commit()
    db.refresh(order)
    return (
        db.query(Order)
        .options(joinedload(Order.items))
        .filter(Order.id == order.id)
        .first()
    )


@router.get("/", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db)):
    return (
        db.query(Order)
        .options(joinedload(Order.items))
        .order_by(Order.id.desc())
        .all()
    )


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = (
        db.query(Order)
        .options(joinedload(Order.items))
        .filter(Order.id == order_id)
        .first()
    )
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
