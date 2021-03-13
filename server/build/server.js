"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class OrderServer {
    static start() {
        const server = express();
        server.use(express.json);
        server.get('/', (req, res) => {
            console.log('fuck');
            res.send('bad requesst bitch');
        });
        server.listen(8000);
    }
}
OrderServer.start();
//# sourceMappingURL=server.js.map