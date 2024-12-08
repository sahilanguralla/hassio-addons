#!/bin/bash

LOCATION_ID=$1

# Load environment variables
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}

# Fetch location details from the database
LOCATION=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -p $DB_PORT -d $DB_NAME -At -F',' -c "SELECT type, path, sshHost, username, password, key, repositoryName FROM locations WHERE id = $LOCATION_ID")

IFS=',' read -r TYPE PATH SSH_HOST USERNAME PASSWORD KEY REPOSITORY_NAME <<< "$LOCATION"

BACKUP_PATH=$PATH

if [ "$TYPE" = "remote" ]; then
  # Create mount point
  MOUNT_POINT="/mnt/$LOCATION_ID"
  mkdir -p $MOUNT_POINT

  # Set up SSHFS options
  SSHFS_OPTIONS=""
  if [ -n "$PASSWORD" ]; then
    SSHFS_OPTIONS="-o password_stdin"
  fi
  if [ -n "$KEY" ]; then
    echo "$KEY" > /tmp/key_$LOCATION_ID
    chmod 600 /tmp/key_$LOCATION_ID
    SSHFS_OPTIONS="-o IdentityFile=/tmp/key_$LOCATION_ID"
  fi

  # Mount remote directory using SSHFS
  echo "$PASSWORD" | sshfs $USERNAME@$SSH_HOST:$PATH $MOUNT_POINT $SSHFS_OPTIONS

  BACKUP_PATH=$MOUNT_POINT
fi

# Initialize restic repository if it doesn't exist
if [ ! -d "$REPOSITORY_NAME" ]; then
  restic -r $REPOSITORY_NAME init
fi

# Run Restic backup
restic -r $REPOSITORY_NAME backup $BACKUP_PATH
BACKUP_STATUS=$?

# Get backup size
SIZE=$(du -sb $BACKUP_PATH | awk '{print $1}')

# Record backup status in the database
STATUS="failure"
if [ $BACKUP_STATUS -eq 0 ]; then
  STATUS="success"
fi

PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -p $DB_PORT -d $DB_NAME -c "INSERT INTO backups (\"locationId\", status, size, \"createdAt\") VALUES ($LOCATION_ID, '$STATUS', $SIZE, NOW())"

if [ "$TYPE" = "remote" ]; then
  # Unmount remote directory
  fusermount -u $MOUNT_POINT
  rm -rf $MOUNT_POINT
  rm -f /tmp/key_$LOCATION_ID
fi
