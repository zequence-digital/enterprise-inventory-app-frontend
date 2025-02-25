x# Use an official Node.js image based on Alpine Linux
FROM node:20

# Set working directory
WORKDIR /src

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Set build arguments
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_CHANNEL_ID
ARG NEXT_PUBLIC_CHANNEL_SECRET

# Set environment variables for build time AND runtime
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_CHANNEL_ID=$NEXT_PUBLIC_CHANNEL_ID
ENV NEXT_PUBLIC_CHANNEL_SECRET=$NEXT_PUBLIC_CHANNEL_SECRET

# Copy the rest of the application code
COPY . .

# Print environment variables during build (for debugging)
RUN echo "Build time environment:" && \
    echo "NEXT_PUBLIC_API_BASE_URL: $NEXT_PUBLIC_API_BASE_URL"
    # echo "NEXT_PUBLIC_CHANNEL_ID: $NEXT_PUBLIC_CHANNEL_ID"

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
