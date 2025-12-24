from django.db import models

# Create your models here.
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    trailer_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
