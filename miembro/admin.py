from django.contrib import admin
from .models import Miembro

# Register your models here.
# admin.site.register(Miembro)

@admin.register(Miembro)
class AdminMiembro(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'cargo', 'texto')
    list_filter = ('cargo',)
    search_fields = ('nombre', 'apellido', 'cargo', 'texto')
