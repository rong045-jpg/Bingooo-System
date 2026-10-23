# Bingooo CAP Backend (FastAPI + SQLite)

## Windows PowerShell setup
Run from `E:\Bingooo-System\backend` after copying these files into your backend folder. Keep a backup of your existing files first.

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python -m app.seed
python -m uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/docs` for interactive API docs and `http://127.0.0.1:8000/health` for health check.

## Endpoints
- `GET /health`
- `GET /api/v1/categories/`
- `GET /api/v1/products/` (optional `?category_id=1`)
- `GET /api/v1/products/{product_id}`
- `POST /api/v1/orders/`
- `GET /api/v1/orders/{order_id}`

Example order body:
```json
{
  "customer_name": "Test Customer",
  "customer_phone": "012345678",
  "note": "Less ice",
  "items": [{"product_id": 4, "quantity": 2, "customizations": {"size": "XL", "sugar": "50%", "toppings": ["Bubble"]}}]
}
```

Pricing rules implemented: Milk Drinks and Fruit Drinks allow sizes M/L/XL, XL adds $0.75, and each allowed topping adds $0.50. Coffee and other categories use the base price. The seed menu is sample data; adjust `seed.py` to match the exact menu in your frontend before using it for real orders. This starter does not process payments or provide admin authentication.
