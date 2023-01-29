const dotenv = require('dotenv');
dotenv.config();

const app = require('./web/app'); // Express
const http = require('http');

// Get port from environment and store in Express.
const port = parseInt(process.env.PORT, 10) || parseInt(process.env.LOCAL_PORT, 10) || 3059;
app.set('port', port); // necessary ?

// Create HTTP server.
const server = http.createServer(app);

server.listen(port, () => { // auto change port if port is already in use, handle error gracefully
    // about app.get('env') https://stackoverflow.com/a/34228447/9259701
    console.log('node server running on %s env, listening on port :%s', app.get('env'), port);
});