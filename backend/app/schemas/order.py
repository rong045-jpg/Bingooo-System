from decimal import Decimal
from datetime import datetime
from typing import Any
from pydantic import BaseModel, Field, ConfigDict

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(ge=1, le=100)
    customizations: dict[str, Any] = Field(default_factory=dict)

class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=1, max_length=120)
    customer_phone: str = Field(min_length=1, max_length=40)
    note: str | None = Field(default=None, max_length=500)
    items: list[OrderItemCreate] = Field(min_length=1)

class OrderItemOut(BaseModel):
    id: int
    product_id: int
    product_name: str
    quantity: int
    unit_price: Decimal
    customizations: dict[str, Any]
    model_config = ConfigDict(from_attributes=True)

class OrderOut(BaseModel):
    id: int
    customer_name: str
    customer_phone: str
    note: str | None
    total: Decimal
    status: str
    created_at: datetime
    items: list[OrderItemOut]
    model_config = ConfigDict(from_attributes=True)
