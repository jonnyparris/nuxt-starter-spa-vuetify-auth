FROM node:13.8.0-buster AS build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app
RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y git
RUN npm install -q && npm cache clean --force
COPY . /usr/src/app

ARG VERSION
ARG BUILD_DATE
ARG GIT_REV
ARG SITEKEY

ENV SITEKEY $SITEKEY
ENV VERSION $VERSION
ENV BUILD_DATE $BUILD_DATE
ENV GIT_REV $GIT_REV

FROM build AS development
ENV HOST 0.0.0.0
CMD [ "npm", "run", "dev"]
