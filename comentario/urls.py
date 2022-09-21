from django.urls import path
from .views import *

app_name = 'apps.comentario'

urlpatterns = [
    # path('mostrarNoticia/<str:pk>', MostrarComentarios.as_view(), name='mostrarNoticia'),
    path('addcomentario/', AddComentario.as_view(), name="addComentario"),
]