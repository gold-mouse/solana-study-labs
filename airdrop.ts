import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const amount: number = Number(process.argv[2]) || 0;

    if (!amount) {
        console.log(`Please provide an amount to send`);
        process.exit(1);
    }

    const keypair = getKeypairFromEnvironment("SECRET_KEY");
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    await airdropIfRequired(
        connection,
        keypair.publicKey,
        amount * LAMPORTS_PER_SOL,
        0.5 * LAMPORTS_PER_SOL,
    );

    console.log(`💰 Finished! The balance for the wallet at address ${keypair.publicKey} is ${await connection.getBalance(keypair.publicKey)}!`);
}

main();
