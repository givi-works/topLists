import nc from 'next-connect'
import openConnection, { closeConnection } from '../../../lib/db'
import Article from '../../../schemas/Article'

const handler = nc().get(async(req, res)=> {
    await openConnection()

    try {
        const lists = await Article.find()
        res.status(200).json( lists )
    } catch (error) {
        res.status(401).json({ message: "something went wrong" })
        await closeConnection()
    }

    await closeConnection()
}).post(async(req, res) => {
    await openConnection()
    const {title, description, poster, items} = req.body
    const slug = title.replace(/\s+/g, '-').toLowerCase()

    const newList = new Article({ 
        title,
        description,
        poster,
        slug,
        items
    })

    try {
        await newList.save()
        res.status(200).json({ message: "new list created" })
    } catch (error) {
        res.status(401).json({ message: "something went wrong" })
        await closeConnection()
    }

    await closeConnection()
})

export default handler