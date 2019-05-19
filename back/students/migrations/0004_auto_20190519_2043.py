# Generated by Django 2.1.5 on 2019-05-19 20:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0003_assignment_date_added'),
    ]

    operations = [
        migrations.CreateModel(
            name='FixtureFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fixturename', models.CharField(max_length=40)),
                ('fixturepath', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='assignment',
            name='fixture',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='students.FixtureFile'),
            preserve_default=False,
        ),
    ]
