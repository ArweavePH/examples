import Arweave from "arweave";

const start = async () => {
  const ARWEAVE_INSTANCE = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const generated = await ARWEAVE_INSTANCE.wallets.generate();
  const address = await ARWEAVE_INSTANCE.wallets.jwkToAddress(generated);
  console.log(address);

  // Find files uploaded using arweave on the internet
  // Check their metadata tags
  const queryObject = {
    query: `{
      transactions (
        owners:["${address}"],
        tags: [
          {
            name: "Type",
            values: ["manifest"]
          }
        ]
      ) {
        edges {
          node {
            id
          }
        }
      }
    }`,
  };

  const results = await ARWEAVE_INSTANCE.api.post("/graphql", queryObject);

  console.log(results);
};

start();
