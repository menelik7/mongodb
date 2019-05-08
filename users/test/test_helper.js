const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false); // See => https://mongoosejs.com/docs/deprecations.html#-findandmodify-

before(done => {
	mongoose.connect("mongodb://localhost/users_test", {
		useNewUrlParser: true
	});
	mongoose.connection
		.once("open", () => {
			done();
		})
		.on("error", error => {
			console.warn("Warning", error);
		});
});

beforeEach(done => {
	const { users, comments, blogposts } = mongoose.connection.collections;
	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
	});
});
