import React from 'react';
import SignClient from '@walletconnect/sign-client';
import QRCodeModal from '@walletconnect/qrcode-modal';

const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
console.log(WALLETCONNECT_PROJECT_ID);

const signClient = await SignClient.init({
  projectId: WALLETCONNECT_PROJECT_ID,
});

export default function WalletConnectButton() {
  const handleClick = async () => {
    try {
      const { uri, approval } = await signClient.connect({
        requiredNamespaces: {
          eip155: {
            methods: [
              'eth_sendTransaction',
              'eth_signTransaction',
              'eth_sign',
              'personal_sign',
              'eth_signTypedData',
            ],
            chains: ['eip155:1'],
            events: ['chainChanged', 'accountsChanged'],
          },
        },
      });
      if (uri) {
        QRCodeModal.open(uri, () => {
          console.log('EVENT', 'QR Code Modal closed');
        });
      }
      const session = await approval();
      console.log('success: ', session);
    } catch (e) {
      console.error(e);
    } finally {
      QRCodeModal.close();
    }
  };

  return (
    <button
      type="button"
      // className="hover:bg-brightBlue h-full w-full rounded-3xl bg-white py-2 px-4 font-bold text-gray-700 transition-colors ease-in-out hover:text-white"
      className="h-full w-full rounded-3xl bg-gray-500 py-2 px-4 font-bold text-white"
      disabled
      onClick={handleClick}
    >
      <s>WalletConnect</s>
      Under Construction
    </button>
  );
}
