# Image with Linux Oracle instant client. 

FROM node:10.13

RUN apt-get update && apt-get install -y \
  unzip \
  libaio-dev

# Add Oracle Instantclient
ADD instantclient-basic-linux.x64-12.2.0.1.0.zip /tmp/
# ADD instantclient-sdk-linux.x64-12.2.0.1.0.zip /tmp/
# ADD instantclient-sqlplus-linux.x64-12.2.0.1.0.zip /tmp/

# && unzip -q /tmp/instantclient-sdk-linux.x64-12.2.0.1.0.zip -d /opt/oracle/ \
# && unzip -q /tmp/instantclient-sqlplus-linux.x64-12.2.0.1.0 -d /opt/oracle/ \

RUN unzip -q /tmp/instantclient-basic-linux.x64-12.2.0.1.0.zip -d /opt/oracle/ \
&& mv /opt/oracle/instantclient_12_2 /opt/oracle/instantclient \
&& ln -s /opt/oracle/instantclient/libclntsh.so.12.1 /opt/oracle/instantclient/libclntsh.so\
&& rm /tmp/instantclient-*

ENV LD_LIBRARY_PATH /opt/oracle/instantclient

# ENV NODE_PATH /opt/node-v10.13-linux-x64/lib/node_modules

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


# RUN npm install
# If you are building your code for production
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
# CMD [ "npm", "start" ]
