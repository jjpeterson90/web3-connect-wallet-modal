export {};

declare global {
  interface Window {
    web3: {
      currentProvider: any;
      eth: any;
    };
    ethereum: any;
  }
}
