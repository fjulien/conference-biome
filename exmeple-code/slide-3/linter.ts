// typescript
class Inspector {
	firstName: string;
	constructor(
		firstName: string,
		private crimeSolved: number,
	) {
		this.firstName = firstName;
		this.crimeSolved = crimeSolved;
	}

	get name(): string {
		return "Inspector " + this.firstName;
	}

	isEndDay(): boolean {
		return this.crimeSolved == 3;
	}
}

var newDetective = new Inspector("Lestrade", 0);
