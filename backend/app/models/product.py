from decimal import Decimal
from sqlalchemy import String, Text, Boolean, Numeric, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    available: Mapped[bool] = mapped_column(Boolean, default=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    category: Mapped["Category"] = relationship(back_populates="products")
