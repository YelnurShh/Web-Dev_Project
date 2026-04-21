from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('register/',      views.register_view),
    path('login/',         views.login_view),
    path('logout/',        views.logout_view),
    path('token/refresh/', TokenRefreshView.as_view()),

    path('places/',          views.PlaceListView.as_view()),
    path('places/<int:pk>/', views.PlaceDetailView.as_view()),

    path('places/<int:place_pk>/reviews/', views.ReviewListView.as_view()),
    path('reviews/<int:pk>/',             views.ReviewDetailView.as_view()),

    path('favorites/',          views.FavoriteListView.as_view()),
    path('favorites/<int:pk>/', views.FavoriteDeleteView.as_view()),

    path('profile/', views.profile_view),
]