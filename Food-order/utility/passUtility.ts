import bcrypt from 'bcrypt'

export const genHash = (password : string)=>{
    return bcrypt.hash(password,10)
}