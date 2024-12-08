#!/usr/bin/env bashio

# Load environment variables from add-on options using bashio
DB_HOST=$(bashio::config 'db_host')
DB_PORT=$(bashio::config 'db_port')
DB_NAME=$(bashio::config 'db_name')
DB_USER=$(bashio::config 'db_user')
DB_PASSWORD=$(bashio::config 'db_password')
UI_PORT=$(bashio::addon.ingress_port)

export DB_HOST
export DB_PORT
export DB_NAME
export DB_USER
export DB_PASSWORD
export UI_PORT

# Create the database if it doesn't exist
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -p $DB_PORT -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -p $DB_PORT -c "CREATE DATABASE \"$DB_NAME\""

# Run database migrations
yarn migrate

# Start the cron job handler
ts-node scripts/cronHandler.ts &

# Start the Next.js application (includes both frontend and backend)
yarn start
