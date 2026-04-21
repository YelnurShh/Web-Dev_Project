from django.contrib import admin
from .models import Place, Favorite, Review

admin.site.register(Place)
admin.site.register(Favorite)
admin.site.register(Review)