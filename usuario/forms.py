#from django.contrib.auth.models import User
from .models import Usuario
from django.db import transaction
from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import Group
# from django import forms


class RegistroUsuarioFrom(UserCreationForm):

    class Meta:
        model = Usuario
        fields = ['username','password1','password2','first_name','last_name','email','telefono','fecha_de_nacimiento','imagen']

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_superuser = False
        user.is_staff = False
        user.save()
        return user


# grupo = Group.objects.get(name='Usuario')
# user.groups.add(grupo)
# usuarios = Usuario.objects.all()
# for u in usuarios:
#     grupo.user_set.add(u)
# user.save_m2m()
