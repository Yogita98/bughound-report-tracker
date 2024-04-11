# # Use an official Node runtime as a parent image
# FROM node:21

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json /app
# #COPY package-lock.json /app
# RUN npm install

# # Bundle app source
# #COPY . /app

# # Build the app
# #RUN npm run build

# # Install serve to serve the static files
# #RUN npm install -g serve

# # Make port 3000 available to the world outside this container
# EXPOSE 3000

# # Run serve when the container launches
# #CMD ["serve", "-s", "build", "-l", "3000"]

# CMD ["npm", "start"]

# Dockerfile
 
# Use an existing node alpine image as a base image.
FROM node:21-alpine
 
# Set the working directory.
WORKDIR /app
 
# Copy the package.json file.
COPY package.json ./

COPY package-lock.json ./
 
RUN npm install -g react-scripts
# Install application dependencies.
RUN npm install
 
# Copy the rest of the application files.
COPY . ./
 
# Expose the port.
EXPOSE 3000
 
# Run the application.
CMD ["npm", "start"]