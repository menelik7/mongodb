const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: String
});

module.exports = PostSchema; // Important DO NOT const Post = mongoose.model('posts', PostSchema) need to export.modules!!!
