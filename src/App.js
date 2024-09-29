import React, { useState } from 'react';
import WalletConnect from './WalletConnect';
import Game from './Game';

const App = () => {
    const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = () => {
        // Simulate wallet connection
        const mockAddress = '0x1234567890abcdef'; // Replace with actual wallet connection logic
        setWalletAddress(mockAddress);
    };

    return (
        <div>
            <WalletConnect onConnect={connectWallet} walletAddress={walletAddress} />
            <Game walletAddress={walletAddress} />
        </div>
    );
};

export default App;
