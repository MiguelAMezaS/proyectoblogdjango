from typing import List
from django.shortcuts import render
from django.views.generic import View, CreateView, ListView
from .models import Miembro

# Create your views here.

# class NuestrosMiembros(ListView):
#     model = Miembro
#     template_name = 'nosotros.html'
#     ordering = ['-id']

def NuestrosMiembros(request):
    miembro = Miembro.objects.all()
    context = {
		'miembro': miembro,
	}
  
    return render(request, 'nosotros.html', context)