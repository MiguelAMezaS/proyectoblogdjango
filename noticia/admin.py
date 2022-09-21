from django.contrib import admin
from .models import Noticia, Categoria
# Register your models here.

# admin.site.register(Noticia)
admin.site.register(Categoria)

@admin.register(Noticia)
class AdminComentario(admin.ModelAdmin):
    list_display = ('usuario', 'categoria', 'activo', 'fecha_publicacion', 'titulo')
    list_filter = ('activo', 'categoria', 'fecha_publicacion')
    search_fields = ('usuario', 'categoria', 'noticia', 'activo', 'titulo')
    actions = ['aprobar_noticias']

    def aprobar_noticias(self, request, queryset):
        queryset.update(activo=True)
    