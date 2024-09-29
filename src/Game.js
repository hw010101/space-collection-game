import React, { useState } from 'react';
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

        // Generate a new planet after collecting
        const newPlanet = { id: Date.now(), points }; // Unique ID for each planet
        setPlanets((prevPlanets) => [...prevPlanets, newPlanet]);

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
                    <img key={planet.id} src={planetImage} alt="Planet" className="planet" />
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

