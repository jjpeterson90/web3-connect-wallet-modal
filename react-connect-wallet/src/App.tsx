import React, { useEffect, useState, useRef } from 'react';
import Web3 from 'Web3';
import ConnectWalletModal from './components/ConnectWalletModal';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const mounted = useRef(false);

  // initiate provider connection
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      window.web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
    }
  });

  const getAccounts = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    return accounts;
  };

  // Watch for wallet connect/disconnect events
  useEffect(() => {
    window.ethereum.on('accountsChanged', async (): Promise<any> => {
      const accounts = await getAccounts();
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        setWalletAddress('');
      }
    });
  });

  useEffect(() => {
    const update = async () => {
      const accounts = await getAccounts();
      setWalletAddress(accounts[0]);
    };
    update();
  });

  const updateAddress = (address: string) => {
    setWalletAddress(address);
  };

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
