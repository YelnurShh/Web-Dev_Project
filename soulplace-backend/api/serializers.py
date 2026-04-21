from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Place, Favorite, Review


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email    = serializers.EmailField(required=False)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
        )


class PlaceFilterSerializer(serializers.Serializer):
    place_type = serializers.CharField(required=False)
    budget     = serializers.CharField(required=False)
    mood       = serializers.CharField(required=False)
    location   = serializers.CharField(required=False)


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Place
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):
    place    = PlaceSerializer(read_only=True)
    place_id = serializers.PrimaryKeyRelatedField(
        queryset=Place.objects.all(),
        source='place',
        write_only=True
    )

    class Meta:
        model  = Favorite
        fields = ['id', 'place', 'place_id']


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model        = Review
        fields       = ['id', 'user', 'place', 'rating', 'text', 'created_at']
        read_only_fields = ['user', 'created_at']