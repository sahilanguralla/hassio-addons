import express from 'express';
import next from 'next';
import { sequelize } from './utils/db';
import bodyParser from 'body-parser';
import locationsRouter from './routes/locations';
import backupsRouter from './routes/backups';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use(bodyParser.json());

// API routes
server.use('/api/locations', locationsRouter);
server.use('/api/backups', backupsRouter);

// Next.js pages
app.prepare().then(() => {
  server.all('*', (req, res) => handle(req, res));

  // Sync database and start the server
  const port = process.env.UI_PORT || 3000;

  sequelize
    .sync()
    .then(() => {
      server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
});
