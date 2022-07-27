const mongoose = require('mongoose')

export default async function openConnection() {
    await mongoose.connect("mongodb+srv://root:Sixmist666%21@cluster0.bdsilh2.mongodb.net/auth-db")
    console.log(`Connection State after connetion established: ${mongoose.connection.readyState}`)
}

export async function closeConnection() { 
    await mongoose.connection.close()
    console.log(`Connection State after connetion closed: ${mongoose.connection.readyState}`)
}