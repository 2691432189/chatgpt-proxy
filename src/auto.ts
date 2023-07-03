// eslint-disable-next-line @typescript-eslint/no-var-requires
const childProcess = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');

const serveFile = './dist/main.js';
const logFile = './dist/log.txt';
const restartText = '\n进程错误，正在重新启动！';

const Restart = () => {
  const currentProcess = childProcess.fork(serveFile);
  currentProcess.once('exit', function (error) {
    console.log(restartText);
    fs.appendFileSync(logFile, `${new Date()}\n${error}`);

    setTimeout(() => Restart(), 2000);
  });
};
Restart();
