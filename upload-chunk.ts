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

  tx.addTag("Content-Type", "application/json");
  tx.addTag("whatever", "whatever");

  await ARWEAVE_INSTANCE.transactions.sign(tx, generated);
  const uploader = await ARWEAVE_INSTANCE.transactions.getUploader(tx);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    );
  }
};

start();
