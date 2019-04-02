FROM python:2.7

RUN set -ex \
	&& pip install smoke_test

ARG zad
ENV zad=${zad}

WORKDIR /app
COPY fixtures /app/fixtures

CMD smoke_test $zad

COPY $zad /app

