# Generated by Django 4.1 on 2022-08-19 11:57

import ckeditor.fields
import cloudinary.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('noticia', '0013_alter_noticia_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='noticia',
            name='activo',
            field=models.BooleanField(default=True, verbose_name='Activo'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='categoria',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='noticia.categoria', verbose_name='Categoría'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='contenido',
            field=ckeditor.fields.RichTextField(verbose_name='Contenido'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='dislikes',
            field=models.ManyToManyField(blank=True, related_name='dislikes', to=settings.AUTH_USER_MODEL, verbose_name='No les gusta'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='fecha_publicacion',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Fecha de publicación'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='imagen',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='Imagen'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='likes', to=settings.AUTH_USER_MODEL, verbose_name='Les gusta'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='resumen',
            field=models.TextField(max_length=250, verbose_name='Resumen'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='titulo',
            field=models.CharField(max_length=150, verbose_name='Título'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='usuario',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Usuario'),
        ),
    ]