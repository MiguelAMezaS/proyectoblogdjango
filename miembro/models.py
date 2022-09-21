from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Miembro(models.Model):
    nombre = models.CharField(max_length=100, null=False, verbose_name='Nombre')
    apellido = models.CharField(max_length=100, null=False, verbose_name='Apellido')
    texto = models.TextField(null=True, blank=True, verbose_name='Texto')
    cargo = models.CharField(max_length=100, null=False, verbose_name='Cargo')
    imagen = CloudinaryField(null=False, blank=False, verbose_name='Imagen')

    def __str__(self):
        return self.nombre + ' ' + self.apellido
