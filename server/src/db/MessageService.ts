import {pool} from './DB';
import {Conversation} from '../interfaces/Conversation';
import {Message} from '../interfaces/Message';

export class MessageService {
    async findConversationsById(id: number): Promise<Conversation[]> {
        return pool
            .query('SELECT * FROM conversations WHERE $1 = ANY(participants)', [id])
            .then(result => {
                return result.rows;
            });
    }

    async findRecentConversationMessages(userId: number): Promise<Message[]> {
        return pool
            .query('SELECT\n' +
                '\t\tjson_agg(\n' +
                '\t\t\tjson_build_object(\n' +
                '\t\t\t\t\'conversationId\', "conversationId",\n' +
                '\t\t\t\t\'sender\', (SELECT row_to_json("t") FROM (SELECT id, username, email FROM users)t WHERE t.id = s.sender),\n' +
                '\t\t\t\t\'recipient\', recipient,\n' +
                '\t\t\t\t\'unread\', unread,\n' +
                '\t\t\t\t\'with\', (SELECT row_to_json("u") FROM (SELECT id, username, email FROM users) AS u WHERE u.id != $1 AND (u.id = s.recipient OR u.id = s.sender)),\n' +
                '\t\t\t\t\'timestamp\', timestamp,\n' +
                '\t\t\t\t\'message\', message\n' +
                '\t\t\t)\n' +
                '\t\t) as aMessages\n' +
                '\tFROM (SELECT DISTINCT ON ("conversationId") * FROM messages WHERE sender = $1 OR recipient = $1 ORDER BY "conversationId", timestamp DESC)s', [userId])
            .then(result => {
                return result.rows[0];
            });
    }

    async findMessagesByConversationId(id: number, requestor: number): Promise<Message[]> {
        return pool
            .query(
                'SELECT * FROM messages WHERE "conversationId" = $1 AND (sender = $2 OR recipient = $2) ORDER BY timestamp ASC',
                [id, requestor]
            )
            .then(result => {
                return result.rows;
            });
    }

    async sendMessage(params): Promise<Message> {
        return pool
            .query('INSERT INTO messages ("conversationId", sender, recipient, unread, timestamp, message, tip, "tipAmount") VALUES ($1, $2, $3, $4, current_timestamp, $5, $6, $7) RETURNING *', params)
            .then(result => {
                return result.rows[0];
            });
    }
}
