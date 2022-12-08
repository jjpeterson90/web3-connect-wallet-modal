import React, { useEffect } from 'react';
// import {
//   EthereumClient,
//   modalConnectors,
//   walletConnectProvider,
// } from '@web3modal/ethereum';
// import { Web3Modal } from '@web3modal/react';
// import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';

interface Props {
  updateAddress: (address: string) => void;
  walletAddress: string;
  closeModal: () => void;
}

export default function WalletConnectButton({
  updateAddress,
  walletAddress,
  closeModal,
}: Props) {
  const connect = () => {
    closeModal();
  };

  return (
    <button
      type="button"
      className="h-full w-full rounded-3xl bg-gray-400 text-black"
      // className="hover:bg-brightBlue h-full w-full rounded-3xl bg-white py-2 px-4 font-bold text-gray-700 transition-colors ease-in-out hover:text-white"
      disabled
      onClick={connect}
    >
      <s>WalletConnect</s>
      <br />
      Under Construction
    </button>
  );
}
