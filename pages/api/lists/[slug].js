import nc from 'next-connect'
import openConnection, { closeConnection } from '../../../lib/db'
import Article from '../../../schemas/Article'


const handler = nc().get(async(req, res) => { 
    await openConnection()
    const singleList = await Article.findOne({ slug: req.query.slug })
    res.status(200).json(singleList)
    await closeConnection()
}).put(async(req, res) => { 
    await openConnection()
    const email = req.body.email

    const list = await Article.findOne({ slug: req.query.slug })

    let listItems = list.items
    const index = listItems.findIndex(object => {
        return object.name === req.body.name;
    });
    const selectedItem = listItems[index]
    const emailList = selectedItem.voted

    const check = emailList.some(e => e.email == email)
    if (check) {
        res.status(401).json({message: "Already Voted"})
        await closeConnection()
    }

    selectedItem.votes++;
    
    emailList.push({ email: email })
    const update = { items: listItems }
    await Article.findOneAndUpdate({slug: req.query.slug}, update)
            
    res.status(200).json({message: "Success"})
    await closeConnection()
})

export default handler