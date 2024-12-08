
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';

const BackupList = ({ locations, onUpdate }) => {
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/locations/${id}`);
      onUpdate();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <Box>
      {locations.length === 0 ? (
        <Typography>No backup locations configured.</Typography>
      ) : (
        <List>
          {locations.map((location) => (
            <ListItem key={location.id} divider>
              <ListItemText
                primary={location.repositoryName}
                secondary={
                  <>
                    <Typography component="span">
                      Type: {location.type}
                    </Typography>
                    <br />
                    <Typography component="span">
                      Path: {location.path}
                    </Typography>
                    <br />
                    <Typography component="span">
                      Cron Schedule: {location.cronSchedule}
                    </Typography>
                    {/* Display last backup status and size if available */}
                  </>
                }
              />
              {/* Implement edit functionality as needed */}
              <IconButton edge="end" onClick={() => handleDelete(location.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default BackupList;
