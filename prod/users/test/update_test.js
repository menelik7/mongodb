const assert = require("assert");

const User = require("../src/user");

describe("Updates records", () => {
	let joe;

	beforeEach(done => {
		joe = new User({ name: "Joe" });
		joe.save().then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then(users => {
				assert(users.length === 1);
				assert(users[0].name === "Alex");
				done();
			});
	}

	it("a model instance sets and saves", done => {
		joe.set("name", "Alex");
		assertName(joe.save(), done);
	});

	it("a model instance updates", done => {
		assertName(joe.updateOne({ name: "Alex" }), done);
	});

	it("a model class updates", done => {
		assertName(User.updateOne({ name: "Joe" }, { name: "Alex" }), done);
	});

	it("a model class updates one particular record", done => {
		assertName(
			User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }),
			done
		);
	});

	it("a model finds one particular record using id and updates", done => {
		assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
	});
});
