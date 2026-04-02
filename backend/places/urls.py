from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # Function-Based Views (FBV) сілтемелері
    path('places/', views.place_list, name='place-list'),
    path('places/match/', views.find_match, name='find-match'),
    
    # Class-Based Views (CBV) сілтемелері
    path('categories/', views.CategoryListAPIView.as_view(), name='category-list'),
    path('places/<int:pk>/', views.PlaceDetailAPIView.as_view(), name='place-detail'),

    # Auth сілтемелері
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', obtain_auth_token, name='login'), # DRF-тің дайын Login функциясы
    path('auth/logout/', views.logout_user, name='logout'),

    # CRUD сілтемелері (Міне, осылар жетіспей тұрған болуы мүмкін!)
    path('preferences/', views.DatePreferenceListCreateView.as_view(), name='preference-list-create'),
    path('preferences/<int:pk>/', views.DatePreferenceDetailView.as_view(), name='preference-detail'),
]