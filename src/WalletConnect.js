import React from 'react';

const WalletConnect = ({ onConnect, walletAddress }) => {
    return (
        <div>
            {walletAddress ? (
                <p>Connected: {walletAddress}</p>
            ) : (
                <button onClick={onConnect}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
