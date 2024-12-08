import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import BackupList from '../components/BackupList';
import BackupForm from '../components/BackupForm';
import axios from 'axios';

const IndexPage = () => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Restic Backup Locations
      </Typography>
      <BackupForm onAdd={fetchLocations} />
      <BackupList locations={locations} onUpdate={fetchLocations} />
    </Container>
  );
};

export default IndexPage;
