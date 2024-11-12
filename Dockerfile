# Step 1: Specify the base image
FROM node:20

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Expose the port the app runs on
EXPOSE 3000

# Step 6: Define the command to run the app
CMD ["npm", "run", "dev"]