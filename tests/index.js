import { Kubernetes } from '../src/index.js';

const kubernetes = new Kubernetes({
  port: 8443,
  host: '192.168.49.2',
});

async function main() {
  try {
    const response = await kubernetes.list();

    console.log(response);
  } catch (e) {
    console.error(e);
  }
}

await main();
