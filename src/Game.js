import React, { useState, useEffect } from 'react';
import './Game.css';
import rocketImage from './images/rocket.png'; // Rocket image
import planetImage from './images/planet.png'; // Planet image

const Game = ({ walletAddress }) => {
    const [score, setScore] = useState(0);
    const [isCollecting, setIsCollecting] = useState(false);
    const [planets, setPlanets] = useState([]);

    const startCollecting = () => {
        setIsCollecting(true);
        const points = Math.floor(Math.random() * 100); // Example points
        setScore((prevScore) => prevScore + points);

        // Generate multiple new planets
        const newPlanets = Array.from({ length: 5 }, (_, index) => ({
            id: Date.now() + index,
            points,
            left: Math.random() * 100, // Random horizontal position
        }));
        setPlanets((prevPlanets) => [...prevPlanets, ...newPlanets]);

        setTimeout(() => {
            setIsCollecting(false);
            alert(`Points collected: ${points}`);
        }, 30000); // 30 seconds
    };

    const claimPoints = () => {
        alert('Points claimed as SRS tokens!');
    };

    return (
        <div className="game-container">
            <h1>Space Planet Collection Game</h1>
            <div className="game-area">
                {planets.map((planet) => (
                    <img 
                        key={planet.id} 
                        src={planetImage} 
                        alt="Planet" 
                        className="planet" 
                        style={{ left: `${planet.left}%` }} // Set horizontal position
                    />
                ))}
            </div>
            {walletAddress ? (
                <div className="controls">
                    <button onClick={startCollecting} disabled={isCollecting}>
                        {isCollecting ? 'Collecting...' : 'Collect Planets'}
                    </button>
                    <p>Score: {score}</p>
                    <button onClick={claimPoints}>Claim Points</button>
                </div>
            ) : (
                <p>Please connect your wallet!</p>
            )}
            <img src={rocketImage} alt="Rocket" className="rocket" />
        </div>
    );
};

export default Game;

