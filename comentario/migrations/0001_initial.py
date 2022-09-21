# Generated by Django 4.0.6 on 2022-08-06 00:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('noticia', '0004_categoria_noticia_categoria'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comentario', models.TextField()),
                ('fecha_publicacion', models.DateTimeField(auto_now_add=True)),
                ('noticia', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='noticia.noticia')),
            ],
        ),
    ]