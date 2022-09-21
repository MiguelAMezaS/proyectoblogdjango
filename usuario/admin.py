from django.contrib import admin
from .models import Usuario
from django.contrib.sites.shortcuts import get_current_site

# site = get_current_site('django.contrib.sites.shortcuts') 
# site.domain = 'http://oportunidaddecambio.com.ar' 
# site.save()
# Register your models here.
# admin.site.register(Usuario)

@admin.register(Usuario)
class AdminUsuario(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'activo', 'email', 'telefono', 'fecha_de_nacimiento', 'fecha_registro', 'ultima_conexion')
    list_filter = ('activo', 'fecha_registro', 'ultima_conexion', 'is_superuser', 'is_staff')
    search_fields = ('username', 'first_name', 'last_name', 'email', 'telefono', 'fecha_de_nacimiento', 'fecha_registro', 'ultima_conexion')
    actions = ['desactivar_usuario', 'activar_usuario']

    def desactivar_usuario(self, request, queryset):
        queryset.update(activo=False)

    def activar_usuario(self, request, queryset):
        queryset.update(activo=True)

