"""djong URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from .views import Index, Contacto
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from apps.noticia.views import ListarNoticias, ListarNoticia
from apps.comentario.views import AgregarLikeComentario, AgregarDislikeComentario, ReplyComentario
from apps.miembro.views import NuestrosMiembros
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from django.contrib.auth import views as VistasDeAutenticacion

urlpatterns = [
    path('admin/', admin.site.urls),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('img/favicon/favicon.ico'))),
    path('', Index, name='index'),
    path('accounts/', include('allauth.urls')),
    path('nosotros/', NuestrosMiembros, name='nosotros'),
    path('contacto/', Contacto, name='contacto'),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('noticia/', include('apps.noticia.urls')),
    path('noticias/', ListarNoticias.as_view(), name='noticias'),
    # path('mostrarNoticia/<str:pk>', MostrarNoticia.as_view(), name='mostrarNoticia'),
    path('noticia/<str:pk>', ListarNoticia.as_view(), name='listarNoticia'),
    path('usuario/', include('apps.usuario.urls')),
    path('comentario/', include('apps.comentario.urls'), name='comentario'),
    path('noticia/<int:post_pk>/comentario/<int:pk>/like/', AgregarLikeComentario.as_view(), name='AgregarLikeComentario'),
    path('noticia/<int:post_pk>/comentario/<int:pk>/dislike/', AgregarDislikeComentario.as_view(), name='AgregarDislikeComentario'),
    path('noticia/<int:post_pk>/comentario/<int:pk>/reply/', ReplyComentario.as_view(), name='ReplyComentario'),
    path('reset_password/', VistasDeAutenticacion.PasswordResetView.as_view(template_name='autenticacion/password-reset.html'), name='password_reset'),
    path('reset_password_send/', VistasDeAutenticacion.PasswordResetDoneView.as_view(template_name='autenticacion/password-reset-done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>', VistasDeAutenticacion.PasswordResetConfirmView.as_view(template_name='autenticacion/password-confirm.html'), name='password_reset_confirm'),
    path('reset_password_complete/', VistasDeAutenticacion.PasswordResetCompleteView.as_view(template_name='autenticacion/password-reset-complete.html'), name='password_reset_complete'),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

