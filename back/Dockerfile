FROM python:3-alpine

WORKDIR /app
ADD . /app
EXPOSE 80

RUN set -ex \
	&& apk add --no-cache --virtual .build-deps \
		gcc \
		musl-dev \
	&& apk add --no-cache \
		postgresql-dev \
	&& pip install -r requirements.txt \
	&& apk del .build-deps \
	&& apk add docker

CMD ["./entrypoint.sh"]
