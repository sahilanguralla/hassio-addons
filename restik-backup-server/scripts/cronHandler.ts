import { schedule, ScheduledTask } from 'node-cron';
import { exec } from 'child_process';
import { sequelize } from '../utils/db';
import { Location } from '../models/Location';

const tasks: { [key: number]: ScheduledTask } = {};

export const loadTasks = async () => {
  const locations = await Location.findAll();
  locations.forEach((location) => {
    scheduleTask(location);
  });
};

export const scheduleTask = (location: any, idToDelete?: number) => {
  const id = location ? location.id : idToDelete;

  // Stop and delete existing task if any
  if (tasks[id]) {
    tasks[id].stop();
    delete tasks[id];
  }

  if (location) {
    // Schedule new task
    tasks[id] = schedule(location.cronSchedule, () => {
      exec(`bash ./scripts/backup.sh ${id}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Backup script error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Backup script stderr: ${stderr}`);
          return;
        }
        console.log(`Backup script output: ${stdout}`);
      });
    });
  }
};

// Start the cron handler
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
    loadTasks();
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
