# SoulPlace - The Perfect Date Matchmaker

## About the Project
[cite_start]**SoulPlace** is a web platform that helps users choose the best date location based on their preferences, temperament, budget, and desired atmosphere[cite: 9]. 

While regular dating sites mainly help find a person, our project goes further—it helps organize the date itself and select a place that truly suits the specific couple. The site analyzes the entered parameters and offers personalized ideas: from cozy coffee shops and restaurants to active and unusual formats like horseback riding, exhibitions, movies, or an evening stroll. 

**Core Value:** The site saves time, eliminates the stress of choosing a location, and makes the date more thoughtful, comfortable, and atmospherically suitable.

## Group Members
[cite_start]This project is developed by a group of exactly 3 students from the same practice lesson[cite: 4, 5]:
1. [cite_start][Shakhar Yelnur] - [Fullstack] [cite: 9]
2. [cite_start][Bekmuratov Galymzhomart] - [Frontend] [cite: 9]
3. [cite_start][Sanatuly Olzhas] - [Backend] [cite: 9]

## Technologies & Requirements Covered
[cite_start]This project is built using Angular and Django as part of the Web Development course at KBTU.

### [cite_start]Front-End (Angular) [cite: 12]
* [cite_start]**Project Setup:** Initialized using the standard Angular project template (`ng new`)[cite: 10].
* [cite_start]**Routing:** Configured with at least 3 named routes and navigation between pages[cite: 17].
* [cite_start]**Components & Directives:** Implements `@for` to loop over data and `@if` for conditional rendering[cite: 18]. [cite_start]Applied basic CSS styling to components[cite: 16].
* [cite_start]**Forms & Events:** Contains at least 4 form controls using `[(ngModel)]` [cite: 15] [cite_start]and at least 4 `(click)` events triggering API requests[cite: 14].
* [cite_start]**Services & Communication:** Uses at least 1 Angular Service with `HttpClient` for all API communication [cite: 20][cite_start], defining interfaces and services to interact with back-end APIs[cite: 13].
* [cite_start]**Authentication:** Features JWT authentication with an HTTP interceptor, a login page, and logout functionality[cite: 19].
* [cite_start]**Error Handling:** API errors are handled gracefully (e.g., displaying error messages to the user on failed requests)[cite: 21].

### [cite_start]Back-End (Django + DRF) [cite: 22]
* [cite_start]**Models:** Defines at least 4 models [cite: 23] [cite_start]with at least 2 `ForeignKey` relationships between models[cite: 25].
* [cite_start]**Serializers:** Includes at least 2 `serializers.Serializer` [cite: 26] [cite_start]and at least 2 `serializers.ModelSerializer`[cite: 27].
* [cite_start]**Views:** Implements at least 2 Function-Based Views (FBV) using DRF decorators [cite: 29] [cite_start]and at least 2 Class-Based Views (CBV) using `APIView`[cite: 30].
* [cite_start]**Authentication:** Uses Token-based authentication with login and logout endpoints[cite: 31]. [cite_start]Created objects are linked to the authenticated user (`request.user`)[cite: 33].
* [cite_start]**CRUD:** Provides full CRUD operations for at least one model[cite: 32].
* [cite_start]**CORS:** Configured `django-cors-headers` to allow requests from the Angular dev server[cite: 34].

## How to Run the Project

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/SoulPlace.git](https://github.com/your-username/SoulPlace.git)
cd SoulPlace


Back-End Setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver


3. Front-End Setup
cd frontend
npm install
ng serve
The application will be available at http://localhost:4200/

Additional Materials

Postman Collection: A Postman collection with all requests (including example responses) is committed to the repository.

