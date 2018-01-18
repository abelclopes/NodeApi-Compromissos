export class User 
{
    constructor(public email:string, 
                public name: string, 
                private password: string ){}
            

    matches(another: User): boolean{
        return another !== undefined && another.email == this.email && another.password == this.password
    }
}


export const users = {
    "fulana@gmail.com": new User('fulana@gmail.com', "fulana", 'fulana123'),
    "beltrana@gmail.com": new User('beltrana@gmail.com', "beltrana", 'beltrana123')
}