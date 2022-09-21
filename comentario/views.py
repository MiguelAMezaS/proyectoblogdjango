from django.urls import reverse_lazy
from django.views.generic import ListView
from .models import Comentario
from .forms import ComentarioForm
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from apps.noticia.models import Noticia
from django.views.generic import View, CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect, HttpResponse

# Create your views here.
########################################################################
#                       views Comentario                               #
########################################################################

class MostrarComentarios(ListView):
    model = Comentario
    template_name = 'noticia/noticia.html'
    ordering = ['-id']

class AddComentario(DetailView):
    model = Comentario
    template_name= "noticia/addComentario.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["comentarios"] = Comentario.objects.all()
        return context

def Comentarios(request):
	return render(request,'comentario/listarComentarios.html')


class AgregarLikeComentario(LoginRequiredMixin, View):
    def post(self, request, pk, *args, **kwargs):
        comentario = Comentario.objects.get(pk=pk)

        is_dislike = False
        for dislike in comentario.dislikes.all():
            if dislike == request.user:
                is_dislike = True
                break

        if is_dislike:
            comentario.dislikes.remove(request.user)

        is_like = False
        for like in comentario.likes.all():
            if like == request.user:
                is_like = True
                break
        
        if not is_like:
            comentario.likes.add(request.user)

        if is_like:
            comentario.likes.remove(request.user)

        next = request.POST.get('next', '/')
        return HttpResponseRedirect(next)


class AgregarDislikeComentario(LoginRequiredMixin, View):
    def post(self, request, pk, *args, **kwargs):
        comentario = Comentario.objects.get(pk=pk)

        is_like = False
        for like in comentario.likes.all():
            if like == request.user:
                is_like = True
                break

        if is_like:
            comentario.likes.remove(request.user)

        is_dislike = False
        for dislike in comentario.dislikes.all():
            if dislike == request.user:
                is_dislike = True
                break
        
        if not is_dislike:
            comentario.dislikes.add(request.user)

        if is_dislike:
            comentario.dislikes.remove(request.user)

        next = request.POST.get('next', '/')
        return HttpResponseRedirect(next)

class ReplyComentario(LoginRequiredMixin, View):
    def post(self, request, post_pk, pk, *args, **kwargs):
        noticia = Noticia.objects.get(pk=post_pk)
        comentario_parent = Comentario.objects.get(pk=pk)
        form = ComentarioForm(request.POST or None)
        if form.is_valid():
            nuevo_comentario = form.save(commit=False)
            nuevo_comentario.usuario = request.user
            nuevo_comentario.noticia = noticia
            nuevo_comentario.comentario_parent = comentario_parent
            nuevo_comentario.save()

        return redirect('listarNoticia', pk=post_pk)



# def AddComentario(request):
# 	form = ComentarioForm(request.POST or None)
# 	if form.is_valid():
# 		usuario = request.user
# 		noticia = Noticia.objects.get(pk=request.POST['noticia'])
# 		form.save()
# 		form = ComentarioForm()
# 	context={
# 		'form':form,
# 		'noticia':noticia,
# 		'usuario':usuario,
# 	}
# 	return render(request,'comentario/addComentario.html', context)


# class ReplyComentario(LoginRequiredMixin, CreateView):
#     model = Comentario
#     form_class = ComentarioForm
#     template_name = 'noticia/addComentario.html'
#     success_url = reverse_lazy('noticia:listarComentarios')
#     def form_valid(self, form):
#         form.instance.usuario = self.request.user
#         form.instance.noticia = Noticia.objects.get(pk=self.kwargs['pk'])
#         return super().form_valid(form)
