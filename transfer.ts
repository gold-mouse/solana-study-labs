import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const suppliedToPubkey = process.argv[2] || null;
    const amount: number = Number(process.argv[3]) || 0;

    if (!suppliedToPubkey) {
        throw new Error(`Please provide a public key to send`)
    }

    if (!amount) {
        throw new Error(`Please provide an amount to send`)
    }

    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

    console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
    const toPubkey = new PublicKey(suppliedToPubkey);


    const transaction = new Transaction();

    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: toPubkey,
        lamports: LAMPORTS_PER_SOL * amount,
    });

    transaction.add(sendSolInstruction);

    const signature = sendAndConfirmTransaction(connection, transaction, [
        senderKeypair,
    ]);

    console.log(
        `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
    );
}

main();
