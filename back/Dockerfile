FROM python:3-alpine

EXPOSE 80

WORKDIR /app
COPY requirements.txt /app
COPY Pipfile.lock /app
COPY Pipfile /app

RUN set -ex \
	&& apk add --no-cache --virtual .build-deps \
		gcc \
		musl-dev \
	&& apk add --no-cache \
		postgresql-dev \
		python2 \
		py2-pip \
		docker \
	&& pip install pipenv \
	&& pipenv install --system \
	&& pip2 install supervisor \
	&& apk del .build-deps

RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY . /app

ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisor/conf.d/supervisord.conf"]
