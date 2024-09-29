import React from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ onWalletConnected }) => {
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                onWalletConnected(accounts[0]); // Get the first account
            } catch (error) {
                console.error("User rejected the request.");
            }
        } else {
            alert('Please install MetaMask or another Ethereum wallet.');
        }
    };

    return <button onClick={connectWallet}>Connect Wallet</button>;
};

export default WalletConnect;
