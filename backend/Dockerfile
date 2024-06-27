FROM node:20-alpine
COPY . /app
WORKDIR /app

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "start"]