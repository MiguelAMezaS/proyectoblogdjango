import django_filters
from .models import Noticia

class SnippetFilter(django_filters.FilterSet):

    ELECCIONES = (
        ('desc', 'Más recientes'),
        ('asc', 'Más antiguos'),
        )
    
    ordering = django_filters.ChoiceFilter(label='Orden', choices = ELECCIONES, method='ordenar_por')
    class Meta:
        model = Noticia
        fields = {
            'titulo': ['icontains'],
            'resumen': ['icontains'], # probar desactivado
            'contenido': ['icontains'], # probar desactivado
            'categoria': ['exact'],
        }

    def ordenar_por(self, queryset, name, value):
        if value == 'asc':
            return queryset.order_by('fecha_publicacion')
        else:
            return queryset.order_by('-fecha_publicacion')
