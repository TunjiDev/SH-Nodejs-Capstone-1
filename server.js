const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 9090;
const os = require('os');

const myServer = http.createServer((req, res) => {
    //Home route
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'Pages', 'index.html'), 'utf8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });

        //About route
    } else if (req.url === '/about') {
        fs.readFile(path.join(__dirname, 'Pages', 'about.html'), 'utf8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });

        //Operating System info route
    } else if (req.url === '/sys') {
        const osinfojson = `hostname: ${os.hostname()}\nplatform: ${os.platform()}\narchitecture: ${os.arch()}\nnumberOfCPUS: ${JSON.stringify(os.cpus())}\nnetworkInterfaces: ${JSON.stringify(os.networkInterfaces())}\nuptime: ${os.uptime()}`;
        fs.writeFile(path.join(__dirname, 'osinfo.json'), JSON.stringify(osinfojson, null, 2), 'utf8', (err) => {
            if (err) throw err;
            
            res.writeHead(201, {'Content-Type': 'text/plain'});
            res.end('Your OS info has been saved successfully!');
        });

        //404 route
    } else {
        fs.readFile(path.join(__dirname, 'Pages', '404.html'), 'utf8', (err, data) => {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
});

myServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// console.log(os.hostname());
// console.log(os.platform());
// console.log(os.arch());
// console.log(os.cpus());
// console.log(os.networkInterfaces());
// console.log(os.uptime());