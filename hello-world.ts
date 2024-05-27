import Arweave from "arweave";

const start = async () => {
  const ARWEAVE_INSTANCE = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });

  // TODO: Add/Airdrop me Arweave please
  const generated = await ARWEAVE_INSTANCE.wallets.generate();

  const tx = await ARWEAVE_INSTANCE.createTransaction(
    {
      data: "Hello world!",
    },
    generated
  );

  await ARWEAVE_INSTANCE.transactions.sign(tx, generated);
  ARWEAVE_INSTANCE.transactions.post(tx).then(console.log).catch(console.log);
  console.log(`https://arweave.net/${tx.id}`);
};

start();
