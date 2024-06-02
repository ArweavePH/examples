import Arweave from "arweave";

const start = async () => {
  const ARWEAVE_INSTANCE = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const generated = await ARWEAVE_INSTANCE.wallets.generate();
  const address = await ARWEAVE_INSTANCE.wallets.jwkToAddress(generated);
  const tx = await ARWEAVE_INSTANCE.wallets.getLastTransactionID(address);
  console.log(tx);
};

start();
