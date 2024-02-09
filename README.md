# A Telegram-Bot-Integrated Ethereum Wallet Eth Burner

Watches each block for a balance update, and if one is detected, burns all that ETH by transferring ETH with the highest possible transaction fee, effectively burning it from the account.

## Instructions

1. **Clone this GitHub repository:**

    ```bash
    git clone <repo_link>
    ```

2. **Create a Telegram Bot:**

    - Go to [@BotFather](https://t.me/BotFather) on Telegram and create a new bot. Copy the bot token provided.
    - Visit [@userinfobot](https://t.me/userinfobot) and get your Telegram user ID.

3. **Generate RPC URLs:**

    - Sign up for accounts on [Alchemy](https://dashboard.alchemy.com/) and [Infura](https://app.infura.io/) services to get RPC URLs.

4. **Set Environment Variables:**

    -Create a `.env` file in the root folder and input your actual values into it.

5. **Install Dependencies:**

    - Navigate to the root folder of the project and install dependencies using yarn:

    ```bash
    yarn install
    ```

6. **Run the Bot:**

    - Finally, start the bot using the following command:

    ```bash
    yarn start
    ```

## Additional Notes

- Make sure to replace `<repo_link>` with the actual link to this repository.
- Update `.env` file with your specific configurations.
- Ensure you have yarn installed globally to execute the commands properly.