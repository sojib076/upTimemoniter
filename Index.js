const http = require('http');
const fs = require('fs');
const path = require('path');
const data = require('./lib/data');

const {handelReqRes} = require('./helpers/handelReqRes');

const app = {}
app.config = {
    port: 3000
}
//  testing file system

data.delete('test', 'newFile', (err) => {
    console.log(err);
});

app.createServer = () => {
    const httpServer = http.createServer(app.handelReqRes);

    httpServer.listen(app.config.port, () => {
        console.log(`Server is running on port ${app.config.port}`);
    })
}
app.handelReqRes = handelReqRes;

app.createServer();
