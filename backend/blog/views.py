from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Update

@api_view(['GET'])
def get_updates(request):
    updates = Update.objects.all().order_by('-updated_at')
    data = [{
        "id": u.id,
        "title": u.title,
        "description": u.description,
        "image": request.build_absolute_uri(u.image.url),
        "updated_at": u.updated_at,
    } for u in updates]
    return Response(data)
