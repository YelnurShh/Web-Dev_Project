# SoulPlace 💕

> A web application for discovering the perfect date spots in Almaty. Users can browse places, filter by type, budget and mood, save favorites, and leave reviews.

---

## Group Members

| Name | Role |
|------|------|
| Yelnur | Backend (Django + DRF) |
| Galymzhomart | Frontend (Angular) |
| Olzhas | Frontend + Integration |

---

## Tech Stack

**Backend:** Python, Django, Django REST Framework, SimpleJWT, django-cors-headers  
**Frontend:** Angular 19, TypeScript, FormsModule, HttpClient  
**Database:** SQLite  
**Auth:** JWT (JSON Web Tokens)

---

## Project Structure

```
soulplace/
├── soulplace-backend/
│   ├── api/
│   │   ├── models.py         # Place, Favorite, Review models
│   │   ├── serializers.py    # Serializers for all models
│   │   ├── views.py          # FBV and CBV views
│   │   ├── urls.py           # API endpoints
│   │   └── admin.py
│   ├── soulplace/
│   │   ├── settings.py       # CORS, JWT, DRF config
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
│
└── soulplace-frontend/
    └── src/app/
        ├── interfaces/       # TypeScript interfaces
        ├── services/         # ApiService (HttpClient)
        ├── interceptors/     # JWT auth interceptor
        ├── components/       # Navbar, PlaceCard
        └── pages/            # Login, Register, Places, Detail, Favorites, Profile
```

---

## Features

- User registration and login with JWT authentication
- Browse all date spots with images, tags, and details
- Filter places by type, budget, mood, and location
- View detailed information about each place
- Add and remove places from favorites
- Leave reviews with star ratings
- User profile page with stats
- Logout with token blacklisting

---

## Backend Requirements Coverage

| Requirement | Implementation |
|---|---|
| 4+ models | `User` (built-in), `Place`, `Favorite`, `Review` |
| 2+ ForeignKey | `Favorite.user`, `Favorite.place`, `Review.user`, `Review.place` |
| 2+ `serializers.Serializer` | `RegisterSerializer`, `PlaceFilterSerializer` |
| 2+ `serializers.ModelSerializer` | `PlaceSerializer`, `FavoriteSerializer`, `ReviewSerializer` |
| 2+ FBV with decorators | `register_view`, `login_view`, `logout_view`, `profile_view` |
| 2+ CBV with APIView | `PlaceListView`, `PlaceDetailView`, `FavoriteListView`, `ReviewListView`, etc. |
| Login + Logout endpoints | `POST /api/login/`, `POST /api/logout/` |
| Full CRUD for one model | `Review`: GET / POST / PATCH / DELETE |
| Link objects to request.user | `Favorite` and `Review` use `serializer.save(user=request.user)` |
| CORS configuration | `django-cors-headers` allows `http://localhost:4200` |
| Postman collection | `SoulPlace_API.postman_collection.json` in repo root |

---

## Frontend Requirements Coverage

| Requirement | Implementation |
|---|---|
| Interfaces + Services | `models.ts`, `api.service.ts` |
| 4+ (click) events with API calls | login, register, applyFilters, addFavorite, removeFavorite, submitReview, logout |
| 4+ `[(ngModel)]` form controls | username, password, email, place_type, budget, mood, location, rating, review text |
| CSS styling | Every component has its own `.css` file |
| 3+ named routes | `/login`, `/register`, `/places`, `/places/:id`, `/favorites`, `/profile` |
| `@for` and `@if` | Used in all list pages and conditional rendering |
| JWT interceptor | `auth.interceptor.ts` adds `Bearer` token to every request |
| HttpClient Service | All API calls go through `ApiService` |
| Error handling | Every component displays error messages on failed requests |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register/` | No | Register new user |
| POST | `/api/login/` | No | Login, returns tokens |
| POST | `/api/logout/` | Yes | Logout, blacklists token |
| POST | `/api/token/refresh/` | No | Refresh access token |
| GET | `/api/profile/` | Yes | Get current user info |
| GET | `/api/places/` | No | List all places (with filters) |
| GET | `/api/places/?mood=romantic&budget=low` | No | Filtered places |
| GET | `/api/places/<id>/` | No | Place details |
| PATCH | `/api/places/<id>/` | No | Update place |
| GET | `/api/favorites/` | Yes | List favorites |
| POST | `/api/favorites/` | Yes | Add to favorites |
| DELETE | `/api/favorites/<id>/` | Yes | Remove from favorites |
| GET | `/api/places/<id>/reviews/` | No | List reviews for a place |
| POST | `/api/places/<id>/reviews/` | Yes | Add a review |
| DELETE | `/api/reviews/<id>/` | Yes | Delete a review |

---

## Setup & Installation

### Backend

```bash
cd soulplace-backend

python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows

pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

### Frontend

```bash
cd soulplace-frontend

npm install
ng serve
```

Frontend runs at: `http://localhost:4200`

---

## Postman Collection

The Postman collection is included in the repository root:  
`SoulPlace_API.postman_collection.json`

It contains 15 requests with example responses covering all endpoints.

To use: open Postman → Import → select the file.

---

## Admin Panel

Django admin panel is available at `http://localhost:8000/admin/`

Login with the superuser credentials created during setup.  
From here you can add, edit and delete Places directly.