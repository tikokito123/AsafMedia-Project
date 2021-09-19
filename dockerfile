FROM node:alpine AS builder
WORKDIR /usr/app 

#client start up
COPY client/package.json .
RUN  npm install
COPY client .
RUN npm run build


# server start up
FROM node:alpine
WORKDIR /usr/app

COPY server/package.json .
RUN  npm install
COPY server .
COPY --from=builder /usr/app/build /usr/app/build

CMD ["npm", "start"]