FROM node:lts-alpine

WORKDIR /app

# Install ssh and git. Git is for test
RUN apk update && apk upgrade && \
    apk add --no-cache git

# Install more dependencies
RUN apk add -t build-deps python3 build-base

# Run project in mode dev
ENTRYPOINT ["./entrypoint.sh"]
CMD ["dev"]

EXPOSE 4000
