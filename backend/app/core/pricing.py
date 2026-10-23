from decimal import Decimal
from app.models.product import Product

TOPPING_PRICE = Decimal("0.50")
XL_SURCHARGE = Decimal("0.75")
CUSTOMIZABLE_CATEGORIES = {"milk drinks", "fruit drinks"}

def calculate_unit_price(product: Product, customizations: dict) -> Decimal:
    price = Decimal(product.price)
    category_name = product.category.name.lower().strip() if product.category else ""
    if category_name not in CUSTOMIZABLE_CATEGORIES:
        return price.quantize(Decimal("0.01"))
    size = str(customizations.get("size", "M" if category_name == "milk drinks" else "L")).upper()
    if size not in {"M", "L", "XL"}:
        raise ValueError("Size must be M, L, or XL")
    if size == "XL":
        price += XL_SURCHARGE
    toppings = customizations.get("toppings", [])
    if not isinstance(toppings, list) or any(t not in {"Bubble", "Coconut Jelly", "Crystal Ball"} for t in toppings):
        raise ValueError("Invalid toppings")
    price += TOPPING_PRICE * len(toppings)
    return price.quantize(Decimal("0.01"))
