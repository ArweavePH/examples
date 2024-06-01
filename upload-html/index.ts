import fs, { PathLike } from "node:fs";
import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk";
(async () => {
  const JWK = JSON.parse(fs.readFileSync("./wallet.json").toString());

  const turbo = TurboFactory.authenticated({ privateKey: JWK });

  const signer = new ArweaveSigner(JWK);

  const { winc: balance } = await turbo.getBalance();

  console.log(balance);

  const filePath: PathLike = "./static_website/index.html";
  const fileSize = fs.statSync(filePath).size;

  const [{ winc: fileSizeCost }] = await turbo.getUploadCosts({
    bytes: [fileSize],
  });

  console.log(fileSizeCost);

  try {
    const fileToUpload = {
      fileStreamFactory: () => fs.createReadStream(filePath),
      fileSizeFactory: () => fileSize,
      signal: AbortSignal.timeout(10_000),
      dataItemOpts: { tags: [{ name: "Content-Type", value: "text/html" }] },
    };
    const uploadResult = await turbo.uploadFile(fileToUpload);
    console.log("Successfully upload data item!", {
      ...uploadResult,
    });
  } catch (error) {
    // upload failed
    console.error("Failed to upload data item!", error);
  } finally {
    const { winc: newBalance } = await turbo.getBalance();
    console.log("New balance:", newBalance);
  }
})();
