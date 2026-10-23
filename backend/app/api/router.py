from fastapi import APIRouter
from app.api.routes import categories, products, orders

api_router = APIRouter()
api_router.include_router(categories.router, prefix="/categories", tags=["Categories"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders"])
