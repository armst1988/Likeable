import { pool } from './DB';
import {User} from '../interfaces/User';

export class UserService {
    async findById(id: number): Promise<User> {
        return pool
            .query('SELECT * FROM users WHERE id = $1', [id])
            .then(result => {
                return result.rows[0];
            });
    }

    async register(user: string[]): Promise<User> {
        return pool
            .query(
                'INSERT INTO users ("username", "password", "salt", "email", "created") VALUES ($1, $2, $3, $4, Now()) RETURNING *',
                [user[0], user[1], user[2], user[3]]
            )
            .then(result => {
                return result.rows[0];
            });
    }

    async findByUsername(username: string): Promise<User> {
        return pool
            .query('SELECT * FROM users WHERE "username" = $1', [username])
            .then(result => {
                return result.rows;
            });
    }

    async findByEmail(email: string): Promise<User> {
        return pool
            .query('SELECT * FROM users WHERE "email" = $1', [email])
            .then(result => {
                return result.rows;
            });
    }
}
