# Generated by Django 4.0.6 on 2022-08-11 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Miembro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('apellido', models.CharField(max_length=100)),
                ('texto', models.TextField(null=True)),
                ('cargo', models.CharField(max_length=100)),
                ('imagen', models.ImageField(blank=True, default='usuario/default.png', null=True, upload_to='miembros')),
            ],
        ),
    ]
