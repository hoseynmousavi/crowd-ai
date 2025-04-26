# Use official Node.js image
FROM node:23

# Set working directory
WORKDIR /server

# Copy package.json and package-lock.json
COPY ./package.json .

# Install dependencies
RUN npm i --force

RUN npm i -g pm2

# Copy application code
COPY . .

# Expose the port the server will run on
EXPOSE 4500

RUN npm run build

# Command to run the server
CMD ["npm", "run", "production"]
