from django.contrib import admin
from .models import Category, Place, DatePreference, PlaceReview

# Біз жасаған 4 модельді админкада көру үшін тіркейміз
admin.site.register(Category)
admin.site.register(Place)
admin.site.register(DatePreference)
admin.site.register(PlaceReview)