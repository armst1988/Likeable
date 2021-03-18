import { pool } from './DB';
import {Order} from '../interfaces/Order';

export class OrderService {
    async findAll(): Promise<Order[]> {
        return pool
            .query('SELECT * FROM orders')
            .then(result => {
                return result.rows;
            });
    }

    async findById(id: number): Promise<Order> {
        return pool
            .query('SELECT * FROM orders WHERE id = $1', [id])
            .then(result => {
                return result.rows[0];
            });
    }
}
