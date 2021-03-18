import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';
import {OrderController} from './controllers/OrderController';
import {UserController} from './controllers/UserController';
import {Constants} from './util/Constants';
import {MessageController} from './controllers/MessageController';

class OrderServer {

    controllers = [new OrderController(), new UserController(), new MessageController()];

    start(): void {

        const server = express();

        server.use(express.json());
        server.use(cors());
        server.use((req, res, next) => {
            const tokenHeader = req.headers.authorization;
            let token = null;

            if (tokenHeader !== undefined) {
                token = tokenHeader.split(' ')[1];
                jwt.verify(token, Constants.JWT_SECRET, (err, data) => {
                    if (!err) {
                        req['auth'] = data;
                        next();
                    } else {
                        res.send(401);
                    }
                });
            } else {
                next();
            }
        });

        for (const controller of this.controllers) {
            server.use('/api', controller.router);
        }

        server.get('/', (req, res) => {
            res.send('DI');
        });

        server.listen(8000);
    }
}

const os = new OrderServer();
os.start();
console.log('started server');
