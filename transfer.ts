import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import wallet = require("./dev-wallet.json");

const from = Keypair.fromSecretKey(new Uint8Array(wallet));

const to = new PublicKey("CSPoJGos3ueoi31tovEbTADcMceVgpGPmh4it2ts2GeA");

const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL / 100,
      })
    );
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = from.publicKey;

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);

    console.log(`Success! Check out your TX here: 
  https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
})();
