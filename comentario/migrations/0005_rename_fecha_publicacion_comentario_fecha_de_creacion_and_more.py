# Generated by Django 4.0.6 on 2022-08-13 07:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('noticia', '0012_noticia_dislikes_noticia_likes'),
        ('comentario', '0004_alter_comentario_options_alter_comentario_noticia'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comentario',
            old_name='fecha_publicacion',
            new_name='fecha_de_creacion',
        ),
        migrations.AddField(
            model_name='comentario',
            name='fecha_de_edicion',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='comentario',
            name='noticia',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='noticia_del_comentario', to='noticia.noticia'),
        ),
        migrations.AlterField(
            model_name='comentario',
            name='usuario',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='autor_del_comentario', to=settings.AUTH_USER_MODEL),
        ),
    ]
