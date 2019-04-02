#!/bin/sh

python3 manage.py migrate
gunicorn --bind 0.0.0.0:80 bachelor_project_rest.wsgi:application --log-level=debug