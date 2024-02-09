const cmdArgs = require("command-line-args");

const dotenv = require('dotenv');

dotenv.config();

type Args = {
    privateKey: string,
    rpcUrl: string,
    beerFund?: string,
};

const optionDefinitions = [
  {
    name: 'private-key',
    alias: 'k',
    type: String,
    defaultValue: process.env.PRIVATE_KEY,
  },
  {
    name: 'rpc-url',
    alias: 'u',
    type: String,
    defaultValue: process.env.RPC_URL,
  },
  {
    name: 'beer-fund',
    alias: 'b',
    type: String,
    defaultOption: true,
    defaultValue: process.env.BEER_FUND,
  },
];
const options = cmdArgs(optionDefinitions);

// ensure all options are set
for (const o of optionDefinitions) {
    if (!options[o.name] && !o.defaultOption) {
        console.error(`Missing argument --${o.name}`);
        process.exit(1);
    }
}

const args: Args = {
  privateKey: options['private-key'],
  rpcUrl: options['rpc-url'],
  beerFund:
    options['beer-fund'] || '0xad166A918d20703D6D5d97919C79f4C56e12A68f',
};

export default args;
