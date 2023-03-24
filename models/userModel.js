import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    root: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dacjdszff/image/upload/v1679563462/nextjs_media/pi488m2abgjg3ibb6z8k.jpg'
    }
},{
    timestamps: true
})

let Dataset = mongoose.models?.user || mongoose.model('user', userSchema)
export default Dataset