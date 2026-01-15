
# Create your models here.
from django.db import models

class Update(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='updates/')
    updated_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
