from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.db.session import get_db
from app.models.product import Product
from app.schemas.product import ProductOut

router = APIRouter()


@router.get("/", response_model=list[ProductOut])
def list_products(category_id: int | None = None, db: Session = Depends(get_db)):
    statement = (
        select(Product)
        .options(joinedload(Product.category))
        .where(Product.available.is_(True))
        .order_by(Product.name)
    )
    if category_id is not None:
        statement = statement.where(Product.category_id == category_id)
    return list(db.scalars(statement).unique().all())


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if product is None or not product.available:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
