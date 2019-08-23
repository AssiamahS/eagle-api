FROM node:10
RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN npm install

CMD [ "npm", "start" ]
EXPOSE 3000