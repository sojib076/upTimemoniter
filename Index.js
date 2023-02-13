const http = require('http');
const fs = require('fs');
const path = require('path');


const {handelReqRes} = require('./helpers/handelReqRes');

const app = {}
app.config = {
    port: 3000
}

app.createServer = () => {
    const httpServer = http.createServer(app.handelReqRes);

    httpServer.listen(app.config.port, () => {
        console.log(`Server is running on port ${app.config.port}`);
    })
}
app.handelReqRes = handelReqRes;

app.createServer();
