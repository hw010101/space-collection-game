// WalletConnect.js
import React, { useState } from 'react';

const WalletConnect = ({ onWalletConnected }) => {
    const connectWallet = async () => {
        // Your logic to connect the wallet here
        const address = '0x1234567890abcdef'; // Replace with actual address from connection
        onWalletConnected(address);
    };

    return <button onClick={connectWallet}>Connect Wallet</button>;
};

export default WalletConnect;
