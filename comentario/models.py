from django.db import models
from apps.noticia.models import Noticia
from apps.usuario.models import Usuario

class Comentario(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, verbose_name='Usuario') # Se puede poner en SET_NULL para que se quede el comentario si se borra el usuario
    noticia = models.ForeignKey(Noticia, on_delete=models.CASCADE, verbose_name='Noticia')
    comentario = models.TextField(null=False, verbose_name='Comentario')
    aprobado = models.BooleanField(default=True, verbose_name='Aprobado')
    fecha_de_creacion = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    fecha_de_edicion = models.DateTimeField(auto_now=True, verbose_name='Fecha de edición')
    likes = models.ManyToManyField(Usuario, related_name='comentario_likes', blank=True, verbose_name='Les gusta')
    dislikes = models.ManyToManyField(Usuario, related_name='comentario_dislikes', blank=True, verbose_name='No les gusta')
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='+', verbose_name='Comentario padre')

    @property
    def children(self):
        return Comentario.objects.filter(parent=self).order_by('fecha_de_creacion')

    @property
    def is_parent(self):
        if self.parent is None: # return self.parent is not None
            return True
        return False

    def __str__(self):
        return self.usuario.username
        # fecha = self.fecha_de_creacion.strftime('%d/%m/%Y')
        # hora = self.fecha_de_creacion.strftime('%H:%M:%S')
        # return str(self.usuario) + ' escribió "' + str(self.comentario) + '" el día ' + str(fecha) + ' a las ' + str(hora) + ' en la publicación [' + str(self.noticia) + ']'
