import React, { useState } from 'react';
import rocketImage from './images/rocket.png'; // Rocket image
import planetImage from './images/planet.png'; // Planet image

const Game = ({ walletAddress }) => {
    const [score, setScore] = useState(0);
    const [isCollecting, setIsCollecting] = useState(false);

    const startCollecting = () => {
        setIsCollecting(true);
        const points = Math.floor(Math.random() * 100); // Example points
        setScore((prevScore) => prevScore + points);

        setTimeout(() => {
            setIsCollecting(false);
            alert(`Points collected: ${points}`);
        }, 30000); // 30 seconds
    };

    const claimPoints = () => {
        // Here you can implement the logic to convert points to SRS tokens
        alert('Points claimed as SRS tokens!');
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Space Planet Collection Game</h1>
            <img src={rocketImage} alt="Rocket" style={{ width: '150px', marginBottom: '20px' }} />
            {walletAddress ? (
                <div>
                    <button onClick={startCollecting} disabled={isCollecting}>
                        {isCollecting ? 'Collecting...' : 'Collect Planets'}
                    </button>
                    <p>Score: {score}</p>
                    <button onClick={claimPoints}>Claim Points</button>
                    <img src={planetImage} alt="Planet" style={{ width: '100px', marginTop: '20px' }} />
                </div>
            ) : (
                <p>Please connect your wallet!</p>
            )}
        </div>
    );
};

export default Game;
