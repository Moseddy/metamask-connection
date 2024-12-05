import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum); 
        const accounts = await provider.send("eth_requestAccounts", []);
  
        const signer = await provider.getSigner();
        const address = accounts[0]; 
        const balance = await provider.getBalance(address); 
  
        // Change the state variables
        setWalletAddress(address);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask!');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 bg-white shadow rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Web3 Wallet Connector</h1>
        {walletAddress ? (
          <div>
            <p className="text-lg">Wallet Address:</p>
            <p className="text-gray-700 mb-2">{walletAddress}</p>
            <p className="text-lg">Balance:</p>
            <p className="text-gray-700">{balance} ETH</p>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
