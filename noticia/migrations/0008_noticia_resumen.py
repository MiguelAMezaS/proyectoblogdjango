# Generated by Django 4.0.6 on 2022-08-11 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('noticia', '0007_alter_noticia_contenido'),
    ]

    operations = [
        migrations.AddField(
            model_name='noticia',
            name='resumen',
            field=models.TextField(max_length=500, null=True),
        ),
    ]
