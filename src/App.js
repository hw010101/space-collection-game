// App.js
import React, { useState } from 'react';
import WalletConnect from './WalletConnect';
import Game from './Game';

const App = () => {
    const [walletAddress, setWalletAddress] = useState('');

    const handleWalletConnected = (address) => {
        setWalletAddress(address);
    };

    return (
        <div>
            <h1>Space Planet Collection Game</h1>
            <WalletConnect onWalletConnected={handleWalletConnected} />
            <p>Connected Wallet: {walletAddress || 'Not connected'}</p>
            <Game walletAddress={walletAddress} />
        </div>
    );
};

export default App;
