# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies from package.json
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose port 53 for DNS traffic (DNS uses UDP, so ensure it works with the protocol)
EXPOSE 53/udp

# Start the server
CMD ["node", "server.js"]
