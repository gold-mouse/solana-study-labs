import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const keypair = getKeypairFromEnvironment("SECRET_KEY");

    const publicKey = new PublicKey(keypair.publicKey);

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    console.log("Connected to devnet!");

    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
        `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
    );
}

main();
