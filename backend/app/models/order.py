from decimal import Decimal
from datetime import datetime
from sqlalchemy import String, Numeric, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    customer_name: Mapped[str] = mapped_column(String(120))
    customer_phone: Mapped[str] = mapped_column(String(40))
    note: Mapped[str | None] = mapped_column(String(500), nullable=True)
    total: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    status: Mapped[str] = mapped_column(String(30), default="pending")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    items: Mapped[list["OrderItem"]] = relationship(back_populates="order", cascade="all, delete-orphan")
