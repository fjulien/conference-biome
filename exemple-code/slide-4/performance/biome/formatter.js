// $ npx @biomejs/biome --version
// Version: 1.5.3
// Timer: 3.254s | 1.793s | 1.887s
// Nombre de fichier 420

const { exec } = require("node:child_process");
const execCommand = (cmd, callback) => {
	console.log("Start test");
	console.time("Timer");
	exec(cmd, (error) => {
		if (error) {
			console.error(`exec error: ${error}`);
			console.timeLog("Timer");
			return;
		}
		callback();
	});
};
execCommand(
	"npx prettier . --write --log-level=silent",
	// 'npx @biomejs/biome format . --write --log-level=none',
	() => {
		console.timeLog("Timer");
	},
);
