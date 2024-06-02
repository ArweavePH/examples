import Arweave from "arweave";

const start = async () => {
  const ARWEAVE_INSTANCE = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const generated = await ARWEAVE_INSTANCE.wallets.generate();
  console.log(generated);
};
start();
