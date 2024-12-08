ARG BUILD_FROM
FROM $BUILD_FROM

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    openssh-client \
    sshfs \
    restic \
    postgresql-client \
    build-base \
    python3 \
    python3-dev \
    libffi-dev \
    openssl-dev \
    make

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apk add --no-cache nodejs

# Install yarn globally
RUN npm install -g yarn

# Set working directory
WORKDIR /app

# Copy application code
COPY . .

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Build Next.js application
RUN yarn build

# Make scripts executable
RUN chmod +x ./run.sh
RUN chmod +x ./scripts/backup.sh

# Expose port (not required for ingress)
EXPOSE 3000

# Start the application
CMD ["/bin/bash", "./run.sh"]
