# Generated by Django 4.0.6 on 2022-08-06 10:56

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('noticia', '0006_noticia_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='noticia',
            name='contenido',
            field=ckeditor.fields.RichTextField(),
        ),
    ]