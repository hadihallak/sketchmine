import { spawn, ChildProcess } from 'child_process';
import chalk from 'chalk';
import * as path from 'path';
import { Logger } from '@utils';
import axios from 'axios';
import { SketchGenerator } from './sketch-generator/sketch-generator';
const log = new Logger();

export function startServer(config: SketchGenerator.Config): Promise<ChildProcess> {
  log.notice('\n\n');
  log.notice(chalk`{cyan start angular app:}{grey ...}\n`, '⚒');
  const url = new URL(`${config.host.protocol}://${config.host.name}:${config.host.port}`);
  return new Promise((resolve, reject) => {
    const appPath = path.resolve(config.library.app);
    const server = spawn(path.join(appPath, '/node_modules/.bin/ng'), ['serve', '--port', url.port], {
      shell: true,
      cwd: appPath,
    });

    server.stdout.on('data', (data) => {
      process.stdout.write(data);
      axios.get(url.href)
        .then(res => resolve(server)) /** angular server is running and go ahead with sketch generator */
        .catch(() => {}); /** catch does not matter try again on next stdout */
    });
    server.on('error', err => reject(err));
    server.on('exit', () => console.log('should exit'));
  });
}