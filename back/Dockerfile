FROM python:3.7-alpine

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
	&& apk del .build-deps

COPY . /app

ENTRYPOINT ["./entrypoint.sh"]
