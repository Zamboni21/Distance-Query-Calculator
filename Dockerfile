# Use the Node.js as the base image
FROM node:22.14.0

# Set the working directory
WORKDIR /src

# Copy all documents from the directory to the container image
COPY . .

# Install dependencies
RUN npm install

# Exposing the port the app runs on
EXPOSE 3000

# Commant and argument to start the application
CMD ["npm", "start"]