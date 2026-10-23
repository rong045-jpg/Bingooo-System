from decimal import Decimal
from sqlalchemy import select
from app.db.session import SessionLocal
from app.db.init_db import init_db
from app.models import Category, Product

MENU = {
    "Coffee": [("Espresso", "Classic espresso", "1.50"), ("Americano", "Espresso with water", "2.00"), ("Cappuccino", "Espresso with steamed milk", "2.50")],
    "Milk Drinks": [("Iced Latte", "Espresso and milk", "2.75"), ("Chocolate Milk", "Chocolate milk drink", "2.50"), ("Matcha Latte", "Matcha and milk", "3.00")],
    "Fruit Drinks": [("Mango Smoothie", "Mango fruit drink", "2.50"), ("Strawberry Smoothie", "Strawberry fruit drink", "2.50"), ("Passion Fruit Tea", "Refreshing passion fruit tea", "2.25")],
}

def main():
    init_db()
    with SessionLocal() as db:
        for category_name, products in MENU.items():
            category = db.scalar(select(Category).where(Category.name == category_name))
            if category is None:
                category = Category(name=category_name)
                db.add(category)
                db.flush()
            for name, description, price in products:
                existing = db.scalar(select(Product).where(Product.name == name, Product.category_id == category.id))
                if existing is None:
                    db.add(Product(name=name, description=description, price=Decimal(price), category_id=category.id, available=True))
        db.commit()
    print("Seed complete.")

if __name__ == "__main__":
    main()
