FROM node:22.1-bullseye AS node-base

# Upgrade the system
RUN apt upgrade -y
RUN apt update -y

# Install nvm for node version management
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash


FROM node-base as app-dev-vue3

ARG APP_BASE_DIR

RUN mkdir -p ${APP_BASE_DIR}
WORKDIR ${APP_BASE_DIR}
COPY ./vue3 ${APP_BASE_DIR}
RUN npm i

CMD ["npm", "run", "dev"]


FROM app-dev-vue3 as app-build

CMD ["npm", "run", "build"]