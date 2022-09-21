from django.contrib import admin
from .models import Comentario

# Register your models here.
# admin.site.register(Comentario)

@admin.register(Comentario)
class AdminComentario(admin.ModelAdmin):
    list_display = ('usuario', 'aprobado', 'comentario', 'fecha_de_creacion', 'fecha_de_edicion', 'noticia')
    list_filter = ('aprobado', 'fecha_de_creacion')
    search_fields = ('usuario', 'noticia', 'aprobado')
    actions = ['aprobar_comentarios']

    def aprobar_comentarios(self, request, queryset):
        queryset.update(aprobado=True)
    