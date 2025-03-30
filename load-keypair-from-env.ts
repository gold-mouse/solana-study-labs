import dotenv from 'dotenv';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

dotenv.config();

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`👋 Hello, ${keypair.publicKey.toBase58()}!`);

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);
