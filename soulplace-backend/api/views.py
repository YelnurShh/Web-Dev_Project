from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth import authenticate


from .models import Place, Favorite, Review,UserProfile
from .serializers import (
    RegisterSerializer, PlaceSerializer,
    FavoriteSerializer, PlaceFilterSerializer,
    ReviewSerializer,
    UserProfileSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'access':  str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    refresh = RefreshToken.for_user(user)
    return Response({
        'access':  str(refresh.access_token),
        'refresh': str(refresh),
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        token = RefreshToken(refresh_token)
        token.blacklist()
        
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    except TokenError:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    profile, _ = UserProfile.objects.get_or_create(user=user)

    if request.method == 'GET':
        return Response({
            'username': user.username,
            'email': user.email,
            'bio': profile.bio,
            'avatar': profile.avatar,
            'phone': profile.phone,
            'favorites_count': Favorite.objects.filter(user=user).count(),
            'reviews_count': Review.objects.filter(user=user).count(),
        })

    if request.method == 'PATCH':
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class PlaceListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        places = Place.objects.all()
        place_type = request.query_params.get('place_type')
        budget     = request.query_params.get('budget')
        mood       = request.query_params.get('mood')
        location   = request.query_params.get('location')

        if place_type:
            places = places.filter(place_type=place_type)
        if budget:
            places = places.filter(budget=budget)
        if mood:
            places = places.filter(mood=mood)
        if location:
            places = places.filter(location__icontains=location)

        return Response(PlaceSerializer(places, many=True).data)


class PlaceDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Place.objects.get(pk=pk)
        except Place.DoesNotExist:
            return None

    def get(self, request, pk):
        place = self.get_object(pk)
        if not place:
            return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(PlaceSerializer(place).data)

    def put(self, request, pk):
        place = self.get_object(pk)
        if not place:
            return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PlaceSerializer(place, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        place = self.get_object(pk)
        if not place:
            return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PlaceSerializer(place, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FavoriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user)
        return Response(FavoriteSerializer(favorites, many=True).data)

    def post(self, request):
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FavoriteDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            favorite = Favorite.objects.get(pk=pk, user=request.user)
        except Favorite.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReviewListView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, place_pk):
        reviews = Review.objects.filter(place_id=place_pk)
        return Response(ReviewSerializer(reviews, many=True).data)

    def post(self, request, place_pk):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, place_id=place_pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Review.objects.get(pk=pk, user=user)
        except Review.DoesNotExist:
            return None

    def patch(self, request, pk):
        review = self.get_object(pk, request.user)
        if not review:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        review = self.get_object(pk, request.user)
        if not review:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        