# Generated by Django 4.1 on 2022-08-19 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0012_alter_usuario_activo_alter_usuario_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='telefono',
            field=models.CharField(blank=True, max_length=11, null=True, verbose_name='Teléfono'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='ultima_conexion',
            field=models.DateTimeField(auto_now=True, verbose_name='Ultima conexión'),
        ),
    ]