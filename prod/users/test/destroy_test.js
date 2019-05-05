const assert = require("assert");

const User = require("../src/user");

describe("Deletes a user", () => {
	let joe;

	beforeEach(done => {
		joe = new User({ name: "Joe" });
		joe.save().then(() => done());
	});

	it("model instance delete", done => {
		joe.delete()
			.then(() => User.findOne({ name: joe.name }))
			.then(user => {
				assert(user === null);
				done();
			});
	});

	it("class method delete", done => {
		User.deleteOne({ name: joe.name })
			.then(() => User.findOne({ name: joe.name }))
			.then(user => {
				assert(user === null);
				done();
			});
	});

	it("class method findOneAndDelete", done => {
		User.findOneAndDelete({ name: joe.name })
			.then(() => User.findOne({ name: joe.name }))
			.then(user => {
				assert(user === null);
				done();
			});
	});

	it("class method findByIdAndDelete", done => {
		User.findByIdAndDelete(joe._id)
			.then(() => User.findOne({ name: joe.name }))
			.then(user => {
				assert(user === null);
				done();
			});
	});
});
