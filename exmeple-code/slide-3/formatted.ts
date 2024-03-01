// typescript
interface User {
	firstname: string;
	lastname: string;
	address?: {
		streetName: string;
		city: string;
	};
}
const usersReponse: User[] = [
	{
		lastname: "Holmes",
		firstname: "Sherlock",
		address: { streetName: 221 + "B Baker Street", city: "Londres" },
	},
	{ firstname: "John", lastname: "Watson" },
];
