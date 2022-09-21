from django import forms
from .models import Comentario
class ComentarioForm(forms.ModelForm):
    comentario = forms.CharField(
        widget=forms.Textarea(attrs={
            'rows':'2', 
            'placeholder':'Escribe un comentario...',
            }), required=True, max_length=250, label='Comentario')
    class Meta:
        model = Comentario
        fields = ('comentario',)
        #exclude = ['post']

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.fields['comentario'].widget.attrs.update({'rows': '2'})
