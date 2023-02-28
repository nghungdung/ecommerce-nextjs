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
        default: 'https://www.nicepng.com/maxp/u2q8u2w7e6o0i1u2/'
    }
},{
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset