# Generated by Django 4.0.6 on 2022-08-06 02:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0002_remove_usuario_fecha_de_nacimiento_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='apellido',
        ),
        migrations.RemoveField(
            model_name='usuario',
            name='nombre',
        ),
    ]