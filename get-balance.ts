import Arweave from "arweave";

const start = async () => {
  const ARWEAVE_INSTANCE = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const generated = await ARWEAVE_INSTANCE.wallets.generate();
  const address = await ARWEAVE_INSTANCE.wallets.jwkToAddress(generated);
  const balance = await ARWEAVE_INSTANCE.wallets.getBalance(address);
  console.log(`${address}: ${balance} winston`);
  console.log(`${address}: ${ARWEAVE_INSTANCE.ar.winstonToAr(balance)} AR`);
};

start();
