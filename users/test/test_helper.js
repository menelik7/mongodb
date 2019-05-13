const mongoose = require("mongoose");

// https://mongoosejs.com/docs/connections.html#options
const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	autoIndex: false, // Don't build indexes
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};

before(done => {
	mongoose.connect("mongodb://localhost:27017/users_test", options);
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
