const mongoose = require("mongoose");
const PostSchema = require("./post");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: name => name.length > 2,
			message: "Username must be longer than two characters"
		},
		required: [true, "Please enter a username"]
	},
	posts: [PostSchema],
	likes: Number,
	blogPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: "blogPost"
		}
	]
});

UserSchema.virtual("postCount").get(function() {
	// DO NOT use an arrow function as "this" will not be the user
	return this.posts.length;
});

UserSchema.pre("remove", function(next) {
	const BlogPost = mongoose.model("blogPost");
	// this === joe -> FYI why we are not using a fat arrow function
	BlogPost.deleteMany({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
