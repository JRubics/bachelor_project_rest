# Stage 1 (Bundling)
FROM node:alpine as builder

WORKDIR /app
ADD . /app
RUN set -ex \
	&& apk add --no-cache yarn \
	&& yarn install \
	&& yarn run build

# Stage 2 (Packaging)
FROM nginx:alpine

COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80