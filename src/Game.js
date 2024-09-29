import React, { useState } from 'react';

const Game = ({ walletAddress }) => {
    const [score, setScore] = useState(0);
    const [isCollecting, setIsCollecting] = useState(false);

    const startCollecting = () => {
        setIsCollecting(true);
        const points = Math.floor(Math.random() * 100); // Example points
        setScore(points);

        setTimeout(() => {
            setIsCollecting(false);
            alert(`Points collected: ${points}`);
        }, 30000);
    };

    const claimPoints = () => {
        // Here you can implement the logic to convert points to SRS tokens
        alert('Points claimed as SRS tokens!');
    };

    return (
        <div>
            <h1>Space Planet Collection Game</h1>
            {walletAddress ? (
                <div>
                    <button onClick={startCollecting} disabled={isCollecting}>Collect Planets</button>
                    <p>Score: {score}</p>
                    <button onClick={claimPoints}>Claim Points</button>
                </div>
            ) : (
                <p>Please connect your wallet!</p>
            )}
        </div>
    );
};

export default Game;
