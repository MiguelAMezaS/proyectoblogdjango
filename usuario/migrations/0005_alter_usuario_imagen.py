# Generated by Django 4.0.6 on 2022-08-14 07:21

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0004_usuario_fecha_de_nacimiento'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='imagen',
            field=cloudinary.models.CloudinaryField(blank=True, default='usuario/default.png', max_length=255, null=True, verbose_name='image'),
        ),
    ]
