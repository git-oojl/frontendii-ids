# Práctica 5 - Agencia de carros

Proyecto simple con:

- `backend/`: Django REST Framework usando `uv`
- `frontend/`: React + Vite

## Backend

```bash
cd backend
uv sync
uv run manage.py migrate
uv run manage.py seed_cars
uv run manage.py runserver
```

La API queda en:

```txt
http://localhost:8000/api/cars/
```

Filtros de ejemplo:

```txt
http://localhost:8000/api/cars/?brand=Toyota
http://localhost:8000/api/cars/?is_available=true
http://localhost:8000/api/cars/?search=Corolla
```

## Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La app abre normalmente en:

```txt
http://localhost:5173/
```
