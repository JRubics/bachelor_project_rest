FROM python:2.7

RUN set -ex \
	&& pip install smoke_test

ARG filepath
ARG filename
ENV filename=${filename}

WORKDIR /app
COPY fixtures /app/fixtures

CMD smoke_test $filename

COPY $filepath /app

