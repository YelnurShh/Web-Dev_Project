from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from django.shortcuts import get_object_or_404

from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Place, Category, DatePreference
from .serializers import (
    PlaceSerializer, 
    CategorySerializer, 
    MatchRequestSerializer, 
    DatePreferenceSerializer  # <-- Осыны қосыңыз
)

# --- FUNCTION-BASED VIEWS (FBV) ---

# 1. Барлық орындарды қайтаратын FBV
@api_view(['GET'])
def place_list(request):
    places = Place.objects.all()
    serializer = PlaceSerializer(places, many=True)
    return Response(serializer.data)

# 2. Свидание параметрлері (вайб, бюджет) бойынша орын іздейтін FBV
@api_view(['POST'])
def find_match(request):
    serializer = MatchRequestSerializer(data=request.data)
    if serializer.is_valid():
        budget = serializer.validated_data['budget']
        vibe = serializer.validated_data['vibe']
        
        # Дерекқордан сәйкес келетін орындарды іздеу
        matches = Place.objects.filter(budget_level=budget, vibe__icontains=vibe)
        result_serializer = PlaceSerializer(matches, many=True)
        return Response(result_serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- CLASS-BASED VIEWS (CBV) ---

# 1. Категориялар тізімін қайтаратын CBV
class CategoryListAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

# 2. Жеке бір орынның толық ақпаратын қайтаратын CBV
class PlaceDetailAPIView(APIView):
    def get(self, request, pk):
        place = get_object_or_404(Place, pk=pk)
        serializer = PlaceSerializer(place)
        return Response(serializer.data)
    

    # --- AUTHENTICATION VIEWS ---

# 1. Тіркелу (Register)
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Логин мен пароль міндетті!'}, status=status.HTTP_400_BAD_REQUEST)
        
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Бұл логин бос емес!'}, status=status.HTTP_400_BAD_REQUEST)
        
    user = User.objects.create_user(username=username, password=password)
    token, created = Token.objects.get_or_create(user=user)
    
    return Response({'token': token.key, 'user_id': user.id}, status=status.HTTP_201_CREATED)

# 2. Шығу (Logout)
@api_view(['POST'])
@permission_classes([IsAuthenticated]) # Тек кірген адам ғана шыға алады
def logout_user(request):
    request.user.auth_token.delete() # Токенді өшіру
    return Response({'message': 'Жүйеден сәтті шықтыңыз!'}, status=status.HTTP_200_OK)

# Файлдың соңында осы кластар болуы керек:

class DatePreferenceListCreateView(generics.ListCreateAPIView):
    serializer_class = DatePreferenceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DatePreference.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DatePreferenceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DatePreferenceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DatePreference.objects.filter(user=self.request.user)