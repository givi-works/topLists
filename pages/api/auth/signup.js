import nc from "next-connect"
import hashPassword from "../../../lib/auth"
import openConnection, { closeConnection } from "../../../lib/db"
import User from '../../../schemas/User'

const handler = nc().post(async(req, res) => { 
    await openConnection()
    const { email, username, password } = req.body
    try {
        const checkEmailAvailability = await User.findOne({ email })
        if(checkEmailAvailability){
            res.status(422).json({ message: "email already exists" })
            await closeConnection()
            return
        }
        const hashedPassword = await hashPassword(password)
        const newUser = new User({ email, username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: "created sucesfully" })
        await closeConnection()
    } catch (error) {
        await closeConnection()
        return res.status(400).json({ message: 'Something Went Wrong' })
    }
})

export default handler
