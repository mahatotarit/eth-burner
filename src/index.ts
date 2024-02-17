import "log-timestamp";
import { providers, Wallet } from "ethers";

// If you're using an Infura RPC URL, please uncomment the following two lines:
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 1000;

import args from "./args";
import burn from "./burn";
import keep_alive from "./keep_alive";

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
