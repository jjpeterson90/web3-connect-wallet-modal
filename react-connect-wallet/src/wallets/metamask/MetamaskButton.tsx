import React, { useState, useEffect } from 'react';

interface Props {
  updateAddress: (arg: string) => void;
  walletAddress: string;
  closeModal: () => void;
}

export default function MetamaskButton({
  updateAddress,
  walletAddress,
  closeModal,
}: Props) {
  const [isDisabled, setIsDisabled] = useState(false);

  const connect = async () => {
    closeModal();
    if (window.web3.eth.currentProvider.isMetaMask) {
      const accounts = await window.web3.eth.requestAccounts();
      if (accounts && accounts.length > 0) {
        updateAddress(accounts[0]);
      }
    } else {
      alert('Please install Metamask'); // @ts-ignore
    }
  };

  useEffect(() => {
    setIsDisabled(!!walletAddress);
  }, [walletAddress]);

  return (
    <button
      type="button"
      disabled={isDisabled}
      className="hover:bg-brightBlue h-full w-full rounded-3xl bg-white py-2 px-4 font-bold text-gray-700 transition-colors ease-in-out hover:text-white"
      onClick={connect}
    >
      Metamask
    </button>
  );
}
