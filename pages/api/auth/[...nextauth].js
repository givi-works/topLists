import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from '../../../lib/auth';
import openConnection, { closeConnection } from '../../../lib/db';
import User from '../../../schemas/User';

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            async authorize({ email, password }){ 
                await openConnection()
                const user = await User.findOne({ email })
                if(!user){ 
                    await closeConnection()
                    throw new Error("User not found")
                }
                const isValid = await verifyPassword(password, user.password)
                if(!isValid){ 
                    await closeConnection()
                    throw new Error("Password is incorrect")
                }
                await closeConnection()
                return {
                    email: user.email
                }
            }
        })
    ]
})