const assert = require("assert");
const User = require("../src/user");

describe("Validates records", () => {
	it("requires a user name", () => {
		const user = new User({ name: undefined });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;

		assert(message === "Please enter a username");
	});

	it("requires a username longer than two charaters", () => {
		const user = new User({ name: "Al" });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;

		assert(message === "Username must be longer than two characters");
	});

	it("disallows invalide records from being saved", done => {
		const user = new User({ name: "Al" });
		user.save().catch(validationResult => {
			const { message } = validationResult.errors.name;

			assert(message === "Username must be longer than two characters");
			done();
		});
	});
});
