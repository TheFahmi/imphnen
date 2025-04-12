import express from 'express'
import next from 'next'
import path from 'path'

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Static files
  server.use('/static', express.static(path.join(__dirname, 'public')));

  // Default route handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});
