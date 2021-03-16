import * as WebSocket from "ws";
import * as jwt from "jsonwebtoken";
import {Constants} from '../util/Constants';
import {SocketData} from '../interfaces/SocketData';

export class WS {
    private static instance: WS
    public WSS

    constructor() {
        if (WS.instance)
            return WS.instance
        WS.instance = this
        this.init(9000)
    }

    init(port) {
        this.WSS = new WebSocket.Server({port: port})
        this.WSS.on('connection', (socket: WebSocket) => {
            console.log('client connected')
            const challenge = {type: 'challenge'}
            socket.send(JSON.stringify(challenge))
            socket.on('message', (message: any) => {
                let payload: any = JSON.parse(message)
                if (payload.type == 'response') {
                    jwt.verify(payload.data, Constants.JWT_SECRET, (err, data) => {
                        if (!err) {
                            socket['userId'] = data.id
                        } else {
                            socket.close()
                        }
                    })
                }
            })
        })
    }


}
