from rest_framework import serializers
from .models import Category, Place, DatePreference, PlaceReview

# 1. ModelSerializer: Категориялар үшін
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# 2. ModelSerializer: Орындар үшін (ForeignKey мәліметін қоса шығару үшін depth=1 қостық)
class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'
        depth = 1

# 3. Serializer: Кездесу параметрлерін (вайб, бюджет) жіберуге арналған жай сериализатор
class MatchRequestSerializer(serializers.Serializer):
    budget = serializers.CharField(max_length=20)
    vibe = serializers.CharField(max_length=100)

# 4. ModelSerializer: Пікірлер үшін
class PlaceReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceReview
        fields = '__all__'


class DatePreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatePreference
        fields = '__all__'
        # Пайдаланушыны автоматты түрде тіркеу үшін 'user' өрісін read_only қыламыз
        read_only_fields = ['user']