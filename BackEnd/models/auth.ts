import {Request, Response} from 'express'
import { User, users } from './users';

export const handleAuthenticaiton = (req: Request, resp: Response) => {
    const user: User = req.body
    if(isValid(user)){
        const dbUser: User = users[user.email]
        resp.json({name: dbUser.name, email: dbUser.email})
    }else{
        resp.status(403).json({message: 'Dados inválidos.'})
    }
}

function isValid(user: User): boolean{
    if(!user) return false
    
    const dbUsers = users[user.email]
    
    return dbUsers !== undefined && dbUsers.macthes(user)
}