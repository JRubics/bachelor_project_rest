FROM python:2.7-slim

WORKDIR /app
CMD ["sh", "-c", "tar -xf /app/fixtures.tar && smoke_test assignment.c"]

RUN set -ex \
	&& apt update -y \
	&& apt install -y gcc tar \
	&& pip install smoke_test

COPY . /app