import * as express from 'express';
import {Response} from 'express';
import {MessageService} from '../db/MessageService';
import {Message} from '../interfaces/Message';
import {Conversation} from '../interfaces/Conversation';
import {WS} from '../socket/socket';

export class MessageController {

    public path = '/messages';
    public router = express.Router();

    private messageService: MessageService;
    private socketServer: any;

    constructor() {
        this.initialize();
    }

    initialize(): void {
        this.router.use((req: any, res: Response, next) => {
            if (req.auth === undefined) {
                res.send(401);
            }
            else {
                next();
            }
        });
        this.router.get(this.path + '/:id', this.getMessages);
        this.router.get(this.path, this.getConversations);
        this.router.post(this.path, this.sendMessage);
        this.messageService = new MessageService();
        this.socketServer = new WS();
    }

    getConversations = async (req: any, res: Response) => {
        const conversations: Message[] = await this.messageService.findRecentConversationMessages(req.auth.id);
        return res.send(conversations);
    }

    getMessages = async (req: any, res: Response) => {
        const messages: Message[] = await this.messageService.findMessagesByConversationId(parseInt(req.params.id), req.auth.id);
        return res.send(messages);
    }

    sendMessage = async (req: any, res: Response) => {
        const params: any[] = [
            req.body.conversationId,
            req.auth.id,
            req.body.recipient,
            true,
            req.body.message,
            req.body.tip,
            req.body.tipAmount
        ];
        const message = await this.messageService.sendMessage(params);
        this.socketServer.WSS.clients.forEach((client) => {
            if (client.userId === req.body.recipient) {
                const data = {type: 'newMessage', payload: message};
                console.log('found recipient in the websocket pool');
                client.send(JSON.stringify(data));
            }
        });
        return res.send(message);
    }
}
