// $ npx @biomejs/biome --version
// Version: 1.5.3
// Timer: 3.254s | 1.793s | 1.887s
// Nombre de fichier 420

const { exec } = require('child_process');

function os_func() {
  this.execCommand = (cmd, callback) => {
    console.log('Start test');
    console.time('Timer');
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      callback(stdout);
    });
  };
}

const os = new os_func();

os.execCommand('npx @biomejs/biome format . --write --log-level=none', returnvalue => {
  console.timeLog('Timer');
});
