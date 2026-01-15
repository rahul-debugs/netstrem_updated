from django.urls import path
from .views import get_updates

urlpatterns = [
    path('updates/', get_updates),
]
