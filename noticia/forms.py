from django import forms
from .models import Noticia

class NoticiaForm(forms.ModelForm):
    class Meta:
        model = Noticia
        fields = ('titulo', 'resumen', 'contenido', 'categoria', 'imagen')
        exclude = ['imagen', 'usuario', 'activo']
        widgets = {
            'titulo': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Título'}),
            'resumen': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Resumen'}),
            'contenido': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Contenido'}),
            'categoria': forms.Select(attrs={'class': 'form-control'}),
        }