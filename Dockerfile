FROM node:6

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install
COPY ./src /app
RUN npm install .

#Image configuration
ADD start.sh /start.sh
RUN chmod 755 /*.sh

EXPOSE 8080
CMD ["/start.sh"]
