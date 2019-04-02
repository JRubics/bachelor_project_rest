FROM python:2.7

ARG zad
ENV zad=${zad}

WORKDIR /app
ADD $zad /app
ADD fixtures /app/fixtures

RUN set -ex \
	&& apt install gcc
		
RUN pip install smoke_test
CMD smoke_test $zad 

