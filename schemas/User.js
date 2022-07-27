const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String, 
    username: String,
    password: String
})

export default mongoose.models.User || mongoose.model("User", userSchema)