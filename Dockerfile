FROM node:16

RUN apt-get update

USER root

ENV PORT=3000

EXPOSE 3000

WORKDIR /app

COPY ["package.json", "yarn.lock" ].

RUN yarn

COPY . .

CMD ["yarn", "run", "dev"]