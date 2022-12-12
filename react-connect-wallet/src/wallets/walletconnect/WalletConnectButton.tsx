import React from 'react';
import Web3 from 'Web3';

import SignClient from '@walletconnect/sign-client';
import { Web3Modal } from '@web3modal/standalone';

// Project IDs for testing purposes only - Do not copy
const WALLETCONNECT_PROJECT_ID = 'ef9000d9d5c8cdc995de425117fcd191';

export default function WalletConnectButton() {
  const handleClick = async () => {
    const web3Modal = new Web3Modal({
      projectId: WALLETCONNECT_PROJECT_ID,
      standaloneChains: ['eip155:1'],
    });
    const signClient = await SignClient.init({
      projectId: WALLETCONNECT_PROJECT_ID,
    });
    const { uri, approval } = await signClient.connect({
      requiredNamespaces: {
        eip155: {
          methods: ['eth_sign'],
          chains: ['eip155:1'],
          events: ['accountsChanged'],
        },
      },
    });
    if (uri) {
      web3Modal.openModal({ uri, standaloneChains: ['eip155:1'] });
      await approval();
      web3Modal.closeModal();
    }
  };

  return (
    <button
      type="button"
      className="hover:bg-brightBlue h-full w-full rounded-3xl bg-white py-2 px-4 font-bold text-gray-700 transition-colors ease-in-out hover:text-white"
      // className="h-full w-full rounded-3xl bg-gray-500 py-2 px-4 font-bold text-white"
      // disabled
      onClick={handleClick}
    >
      WalletConnect
      <p>(Broken)</p>
    </button>
  );
}
