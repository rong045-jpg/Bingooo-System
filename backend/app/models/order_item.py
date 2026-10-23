from decimal import Decimal
from sqlalchemy import String, Integer, Numeric, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

class OrderItem(Base):
    __tablename__ = "order_items"
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))
    product_name: Mapped[str] = mapped_column(String(120))
    quantity: Mapped[int] = mapped_column(Integer)
    unit_price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    customizations: Mapped[dict] = mapped_column(JSON, default=dict)
    order: Mapped["Order"] = relationship(back_populates="items")
