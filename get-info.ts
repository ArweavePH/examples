import Arweave from "arweave";

const start = async () => {
  const ARWEAVE_INSTANCE = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const info = await ARWEAVE_INSTANCE.network.getInfo();
  console.log(info);
};

start();
