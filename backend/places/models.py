from django.db import models
from django.contrib.auth.models import User

# Қосымша талап: Custom Model Manager 
# Тек бюджеттік (арзан) орындарды сүзіп шығаратын менеджер
class AffordablePlaceManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(budget_level='low')

# 1-ші модель: Орынның категориясы (мысалы: "Кино", "Парк", "Ресторан")
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# 2-ші модель: Кездесу орны (Place)
class Place(models.Model):
    BUDGET_CHOICES = [
        ('low', 'Төмен (Студенттік)'),
        ('medium', 'Орташа'),
        ('high', 'Жоғары (Премиум)'),
    ]
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='places') # 1-ші ForeignKey
    description = models.TextField()
    budget_level = models.CharField(max_length=20, choices=BUDGET_CHOICES)
    vibe = models.CharField(max_length=100) # мысалы: "Романтикалық", "Активті", "Тыныш"

    objects = models.Manager() # Стандартты менеджер
    affordable_objects = AffordablePlaceManager() # Біз жасаған Custom менеджер

    def __str__(self):
        return self.name

# 3-ші модель: Пайдаланушының қалауы (Свидание параметрлерін іздеу тарихы)
class DatePreference(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='preferences') # 2-ші ForeignKey
    preferred_budget = models.CharField(max_length=20)
    desired_vibe = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} қалауы ({self.desired_vibe})"

# 4-ші модель: Пікір немесе Сақталған орын
class PlaceReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews') # 3-ші ForeignKey
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews') # 4-ші ForeignKey
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} пікірі: {self.place.name}"