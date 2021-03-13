import * as express from 'express'
import {Request, Response} from "express";
import {OrderService} from "../db/OrderService";
import {Order} from "../interfaces/Order";

export class OrderController {

    public path = '/orders'
    public router = express.Router()

    private orderService

    constructor() {
        this.initialize()
    }

    initialize(): void {
        this.router.get(this.path + '/:id', this.getOrder)
        this.router.get(this.path, this.getOrders)
        this.orderService = new OrderService()
    }

    getOrder = async (req: Request, res: Response) => {
        let order = await this.orderService.findById(parseInt(req.params.id))
        return res.send(order)
    }

    getOrders = async (req: Request, res: Response) => {
        let orders: Order[] = await this.orderService.findAll()
        return res.send(orders)
    }
}