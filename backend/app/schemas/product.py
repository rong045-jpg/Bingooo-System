from decimal import Decimal
from pydantic import BaseModel, ConfigDict
class ProductOut(BaseModel):
    id: int
    name: str
    description: str | None = None
    price: Decimal
    image_url: str | None = None
    available: bool
    category_id: int
    model_config = ConfigDict(from_attributes=True)
