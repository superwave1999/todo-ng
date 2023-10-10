FROM ghcr.io/static-web-server/static-web-server:2-alpine

ENV SERVER_ROOT="/public"

COPY dist/todo-front /public
