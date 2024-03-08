// $ npx prettier -v
// 3.2.5
// Timer: 11.126s | 10.822s | Timer: 10.634s
// Nombre de fichier 427

const { exec } = require('child_process');

function os_func() {
  this.execCommand = (cmd, callback) => {
    console.log('Start test');
    console.time('Timer');
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        console.timeLog('Timer');
        return;
      }
      callback(stdout);
    });
  };
}

const os = new os_func();

os.execCommand('npx prettier . --write --log-level=silent', returnvalue => {
  console.timeLog('Timer');
});