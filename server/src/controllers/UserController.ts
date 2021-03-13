import * as bcrypt from "bcrypt"
import * as express from "express"
import * as jwt from "jsonwebtoken"
import {Request, Response} from "express";
import {UserService} from "../db/UserService";
import {Constants} from "../util/Constants";

export class UserController {

    public path = '/user'
    public router = express.Router()

    private userService

    constructor() {
        this.initialize()
    }

    initialize(): void {
        this.router.get(this.path, this.getUser)
        this.router.post(this.path, this.register)
        this.router.post(this.path + '/login', this.login)
        this.userService = new UserService()
    }

    getUser = async (req: Request, res: Response) => {
        let user = await this.userService.findById(null)
        return res.send(user)
    }

    register = async (req: Request, res: Response) => {
        let user = [req.body.username, req.body.password, null, req.body.email]

        this.userService.findByUsername(req.body.username)
            .then(result => {
                if (result.length === 0) {
                    this.userService.findByEmail(req.body.email)
                        .then(result => {
                            if (result.length === 0) {
                                bcrypt.hash(user[1], 12, (err, hash) => {
                                    user[1] = hash
                                    user[2] = 'null'
                                    this.userService.register(user)
                                        .then(result => {
                                            let data = {
                                                id: result.id,
                                                username: result.username,
                                                email: result.email
                                            }
                                            let token = jwt.sign(data, Constants.JWT_SECRET, {algorithm: 'HS256', expiresIn: Constants.JWT_TOKEN_LIFE})
                                            res.cookie("auth", token, {secure: true, httpOnly: true})
                                            return res.send(result)
                                        })
                                })
                            } else {
                                return res.json({result: 'error', message: 'E-mail already associated with an account'})
                            }
                        })
                } else
                    return res.json({result: 'error', message: 'Username already exists'})
            })
    }

    login = async (req: Request, res: Response) => {
        console.log('login request');
        let username = req.body.username

        let foundUsers = await this.userService.findByUsername(username)


        if (foundUsers.length > 0) {
            bcrypt.compare(req.body.password, foundUsers[0].password, (err, result) => {
                if (result) {
                    let data = {
                        id: foundUsers[0].id,
                        username: foundUsers[0].username,
                        email: foundUsers[0].email
                    }
                    let token = jwt.sign(data, Constants.JWT_SECRET, {algorithm: 'HS256', expiresIn: Constants.JWT_TOKEN_LIFE})
                    foundUsers[0].token = token
                    delete foundUsers[0].password
                    return res.send(foundUsers[0])
                } else
                    return res.json({result: 'error', message: 'Invalid username or password'})
            })
        } else
            return res.json({result: 'error', message: 'Invalid username or password'})
    }
}
