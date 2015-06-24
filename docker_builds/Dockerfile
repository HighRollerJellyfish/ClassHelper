FROM node

RUN npm install nodemon bower -g
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
COPY . /usr/src/app/
ONBUILD RUN npm install
ONBUILD RUN bower install

CMD ["npm", "start"]
