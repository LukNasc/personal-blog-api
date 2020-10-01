import mongoose from 'mongoose';

export interface ArticelModel extends mongoose.Document{
    title: string,
    date: string
}

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    banner: String,
    user: String,
}) ;

export default  mongoose.model<ArticelModel>("Articles", ArticleSchema);