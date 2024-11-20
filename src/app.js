let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// WebSocket stream setup
io.of('/stream').on('connection', stream);

// Export serverless function for Vercel
module.exports = (req, res) => {
    server(req, res); // Vercel uses serverless functions, hence this line
};
