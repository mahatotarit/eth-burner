import "log-timestamp";
import { providers, Wallet } from "ethers";

import http from 'http';

// Create a server
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
});

// Listen on port 8080
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// If you're using an Infura RPC URL, please uncomment the following two lines:
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 1000;

import args from "./args";
import burn from "./burn";

// pulls args from cmd line
const RPC_URL = args.rpcUrl;
const VICTIM_KEY = args.privateKey;

async function main() {
  console.log(`Connected to ${RPC_URL}`);

  const provider = new providers.JsonRpcProvider(RPC_URL);

// If you're using WebSocketProvider, activate this line and deactivate the one above.
//   const provider = new providers.WebSocketProvider(RPC_URL);

  const burnWallet = new Wallet(VICTIM_KEY, provider);
  await provider.ready;
  console.log('Beer fund address: ', args.beerFund);

  provider.on('block', async (blockNumber) => {
    console.log(`[BLOCK ${blockNumber}]`);
    await burn(burnWallet);
  });
}

main();

export default {};
