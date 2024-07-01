FROM node:latest

WORKDIR /api

COPY . .

RUN rm -rf node_modules
RUN npm install
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000


