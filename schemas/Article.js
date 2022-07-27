import mongoose from "mongoose";

const { Schema } = mongoose

const articleSchema = new Schema({
  title: String,
  description: String, 
  slug: String,
  poster: String,
  items: [{
    name: String,
    image: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png"},
    votes: { type: Number, default: 0 },
    voted: [{ email: { type: String, default: "test@test.com"} }]
    }]
})

export default mongoose.models.Article || mongoose.model("Article", articleSchema)