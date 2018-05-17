FROM node:6-alpine

ADD . /usr/app/

RUN apk update

COPY package.json /tmp/package.json
RUN cd /tmp && yarn --quiet
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app

WORKDIR /usr/app

# Add libc6-compat
RUN apk add --upgrade --no-cache libc6-compat

# Build optimized React sources
RUN yarn run build

ENV NODE_ENV "production"

CMD ["yarn", "start-prod"]
