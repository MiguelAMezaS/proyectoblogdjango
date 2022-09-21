from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

# Create your models here.

class Usuario(AbstractUser):
    first_name = models.CharField(max_length=100, null=False, blank=False, verbose_name='Nombre')
    last_name = models.CharField(max_length=100, null=False, blank=False, verbose_name='Apellido')
    email = models.EmailField(max_length=150, null=False, blank=False, verbose_name='Email')
    telefono = models.CharField(max_length=11, null=True, blank=True, verbose_name='Teléfono')
    fecha_de_nacimiento = models.DateField(null=True, blank=True, verbose_name='Fecha de nacimiento')
    imagen = CloudinaryField(null=True, blank=True , verbose_name='Imagen')# antes 'image'
    activo = models.BooleanField(default=True, verbose_name='Activo')
    fecha_registro = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de registro')
    ultima_conexion = models.DateTimeField(auto_now=True, verbose_name='Ultima conexión')

    def get_absolute_url(self):
        return reverse('index')