FROM node 

# Set the working directory in the container
WORKDIR /app/backend  # Set the correct path to the backend folder


# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install


# node_modules
# public
# src
# |__controllers
# |__db
# |__routes
# |__app.ts
# |__index.ts
# Dockerfile
# package.json
# package-lock.json
# tsconfig.json
