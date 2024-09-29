import React, { useState } from 'react';

const WalletConnect = ({ setWalletAddress }) => {
    const [error, setError] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
            } catch (err) {
                setError('Wallet connection failed!');
            }
        } else {
            setError('Please install a wallet like MetaMask!');
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default WalletConnect;
