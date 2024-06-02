This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Ardrive Turbo-SDK

Install turbo-sdk and arweave wallet kit

```bash
npm install @ardrive/turbo-sdk arweave-wallet-kit
```

Checkout on how to use and setup arweave wallet kit

- [Arweave Wallet Kit Documentation](https://docs.arweavekit.com/wallets/wallet-kit/setup) - lSetup the Arweave Wallet Kit component library.

Sample snippet for initiating signer and turbofactory instance

```javascript
const signerInstance = new ArconnectSigner(window.arweaveWallet);
// Setting a public key is necessary to proceed with any wallet interaction, such as signing data.
if (!signerInstance.publicKey) {
  await signerInstance.setPublicKey();
}

const turboInstance = TurboFactory.authenticated({
  signer: signerInstance,
});
```

Sample snippet for upload using turbo-sdk and arbundles for creating signed DataItem

```javascript
const signedDataItem = createData(
  // The data to be signed is a JSON string
  JSON.stringify({ hello: "World" }),
  // The signer to be used to sign the data
  signer,
  {
    tags: [
      { name: "Content-Type", value: "application/json" },
      { name: "App-Name", value: "XendevPH-Cohort-0" },
      { name: "App-Version", value: "0.1.0" },
      {
        name: "Title",
        value: "Rickroll",
      },
    ],
  }
);

await signedDataItem.sign(signer);

const uploadResult = await turbo.uploadSignedDataItem({
  dataItemStreamFactory: () => signedDataItem.getRaw(),
  dataItemSizeFactory: () => signedDataItem.getRaw().length,
  signal: AbortSignal.timeout(10_000),
});
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
