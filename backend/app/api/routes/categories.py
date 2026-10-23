from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.category import Category
from app.schemas.category import CategoryOut

router = APIRouter()


@router.get("/", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    statement = select(Category).order_by(Category.name)
    return list(db.scalars(statement).all())
