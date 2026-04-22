from django.db import models
from django.contrib.auth.models import User

class ActivePlaceManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()  
    

class Place(models.Model):
    PLACE_TYPE_CHOICES = [
        ('cafe', 'Cafe'),
        ('restaurant', 'Restaurant'),
        ('cinema', 'Cinema'),
        ('park', 'Park'),
        ('coffee_shop', 'Coffee Shop'),
    ]
    BUDGET_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    MOOD_CHOICES = [
        ('romantic', 'Romantic'),
        ('cozy', 'Cozy'),
        ('fun', 'Fun'),
        ('calm', 'Calm'),
    ]

    name        = models.CharField(max_length=200)
    description = models.TextField()
    place_type  = models.CharField(max_length=50, choices=PLACE_TYPE_CHOICES)
    location    = models.CharField(max_length=200)
    budget      = models.CharField(max_length=20, choices=BUDGET_CHOICES)
    mood        = models.CharField(max_length=20, choices=MOOD_CHOICES)
    image_url   = models.URLField(blank=True, null=True)
    objects = ActivePlaceManager()

    def __str__(self):
        return self.name


class Favorite(models.Model):
    user  = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='favorited_by')

    class Meta:
        unique_together = ('user', 'place')

    def __str__(self):
        return f"{self.user.username} → {self.place.name}"


class Review(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    place      = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews')
    rating     = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    text       = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'place')

    def __str__(self):
        return f"{self.user.username} → {self.place.name} ({self.rating}★)"
    

class UserProfile(models.Model):
    user   = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio    = models.TextField(blank=True)
    avatar = models.URLField(blank=True)
    phone  = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"