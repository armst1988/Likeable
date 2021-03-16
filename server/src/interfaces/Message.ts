export class Message {
    id: number;
    conversationId: number;
    sender: number;
    recipient: number;
    unread: boolean;
    timestamp: string;
    message: string;
    tip: boolean;
    tipAmount: number;
    with: any;
}
