from django.db import models
from cloudinary.models import CloudinaryField
from apps.usuario.models import Usuario
from ckeditor.fields import RichTextField
from django.urls import reverse
from taggit.managers import TaggableManager


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.nombre

class Noticia(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, verbose_name='Usuario') # se puede poner en CASCADE para que se borre la noticia si se borra el usuario
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, verbose_name='Categoría')
    titulo = models.CharField(max_length=150, null=False, verbose_name='Título')
    resumen = models.TextField(max_length=250, null=False, verbose_name='Resumen')
    contenido = RichTextField(null=False, verbose_name='Contenido')
    imagen = CloudinaryField(null=False, blank=False, verbose_name='Imagen')
    fecha_publicacion = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de publicación')
    activo = models.BooleanField(default=True, verbose_name='Activo')
    likes = models.ManyToManyField(Usuario, related_name='likes', blank=True, verbose_name='Les gusta')
    dislikes = models.ManyToManyField(Usuario, related_name='dislikes', blank=True, verbose_name='No les gusta')

    def __str__(self):
        fecha = self.fecha_publicacion.strftime('%d/%m/%Y')
        hora = self.fecha_publicacion.strftime('%H:%M:%S')
        return 'Título: ' + str(self.titulo) + ' | Categoría: ' + str(self.categoria) + ' | Autor: ' + str(self.usuario) + ' | Fecha de creación: ' + str(fecha) + ' a las ' + str(hora)

    def get_absolute_url(self):
        return reverse("mostrarNoticia", kwargs={"id": self.id})
    


    