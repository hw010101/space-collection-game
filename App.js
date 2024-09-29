import React, { useState } from 'react';
import WalletConnect from './WalletConnect';
import Game from './Game';

const App = () => {
    const [walletAddress, setWalletAddress] = useState('');

    return (
        <div>
            <WalletConnect setWalletAddress={setWalletAddress} />
            <Game walletAddress={walletAddress} />
        </div>
    );
};

export default App;
