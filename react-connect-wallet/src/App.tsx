import React, { useEffect, useState, useRef } from 'react';
import Web3 from 'Web3';
import ConnectWalletModal from './components/ConnectWalletModal';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const mounted = useRef(false);

  const updateAddress = (address: string) => {
    setWalletAddress(address);
  };

  // initiates provider connection and sets up a listener to detect wallet address changes
  const initWeb3 = async () => {
    window.web3 = new Web3(Web3.givenProvider);
    window.web3.eth.currentProvider.on('accountsChanged', async () => {
      if (window.web3.eth) {
        const accounts = await window.web3.eth.getAccounts();
        updateAddress(accounts[0]);
      }
    });
  };

  // initiate provider connection on mount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      initWeb3();
    }
  });

  return (
    <div className="App">
      <h1 className="mb-4 text-6xl">Take Home Challenge</h1>
      <h2 className="mb-4 text-3xl">Connect a wallet to get started.</h2>
      <hr />
      <div className="mt-8">
        <ConnectWalletModal
          updateAddress={updateAddress}
          walletAddress={walletAddress}
        />
      </div>
      <div className="mx-auto mt-8 flex place-items-center justify-center">
        <div className="pr-4 text-xl">Network Status:</div>
        <div
          className="mr-2 h-7 w-7 rounded-full"
          style={{
            backgroundColor: window.web3 ? 'lime' : 'red',
          }}
          id="connectionStatus"
        />
        <div className="pt-1 text-lg text-yellow-500">
          {window.web3 ? 'Connected' : 'Not Connected'}
        </div>
      </div>
      <div className="mt-8">
        <span className="pr-4 text-xl">Wallet Address:</span>
        <span className="text-lg text-yellow-500">
          {walletAddress || 'No Wallet Connected'}
        </span>
      </div>
    </div>
  );
}

export default App;
