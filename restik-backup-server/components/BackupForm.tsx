import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from '@mui/material';
import axios from 'axios';

const BackupForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    type: 'local',
    path: '',
    sshHost: '',
    username: '',
    password: '',
    key: '',
    cronSchedule: '',
    repositoryName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/locations', formData);
      onAdd();
      setFormData({
        type: 'local',
        path: '',
        sshHost: '',
        username: '',
        password: '',
        key: '',
        cronSchedule: '',
        repositoryName: '',
      });
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value="local">Local</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Path"
        name="path"
        value={formData.path}
        onChange={handleChange}
        required
      />
      {formData.type === 'remote' && (
        <>
          <TextField
            fullWidth
            margin="normal"
            label="SSH Host"
            name="sshHost"
            value={formData.sshHost}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="SSH Key"
            name="key"
            multiline
            rows={4}
            value={formData.key}
            onChange={handleChange}
          />
        </>
      )}
      <TextField
        fullWidth
        margin="normal"
        label="Cron Schedule"
        name="cronSchedule"
        value={formData.cronSchedule}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Restic Repository Name"
        name="repositoryName"
        value={formData.repositoryName}
        onChange={handleChange}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Add Location
      </Button>
    </Box>
  );
};

export default BackupForm;
