import React, { useState, useEffect } from 'react';
import './Game.css';
import rocketImage from './images/rocket.png'; // Rocket image
import planetImage from './images/planet.png'; // Planet image

const Game = ({ walletAddress }) => {
    const [score, setScore] = useState(0);
    const [isCollecting, setIsCollecting] = useState(false);
    const [planets, setPlanets] = useState([]);
    const [showWalletAddress, setShowWalletAddress] = useState('');

    useEffect(() => {
        if (walletAddress) {
            setShowWalletAddress(walletAddress);
        }
    }, [walletAddress]);

    const startCollecting = () => {
        setIsCollecting(true);
        generatePlanets();

        setTimeout(() => {
            setIsCollecting(false);
        }, 30000); // 30 seconds
    };

    const generatePlanets = () => {
        const newPlanets = Array.from({ length: 5 }, (_, index) => ({
            id: Date.now() + index,
            points: Math.floor(Math.random() * 10) + 1, // Points for each planet
            left: Math.random() * 90, // Random horizontal position (90 to fit in screen)
        }));
        setPlanets((prevPlanets) => [...prevPlanets, ...newPlanets]);
    };

    const collectPlanet = (points, id) => {
        setScore((prevScore) => prevScore + points);
        setPlanets((prevPlanets) => prevPlanets.filter((planet) => planet.id !== id));

        // Generate new planets if there are less than 5
        if (planets.length <= 5) {
            generatePlanets();
        }
    };

    const claimPoints = () => {
        alert('Points claimed as SRS tokens!');
    };

    return (
        <div className="game-container">
            <h1>Space Planet Collection Game</h1>
            {showWalletAddress && <p>Connected Wallet: {showWalletAddress}</p>}
            <div className="game-area">
                {planets.map((planet) => (
                    <img 
                        key={planet.id} 
                        src={planetImage} 
                        alt="Planet" 
                        className="planet" 
                        style={{ left: `${planet.left}%`, position: 'absolute', top: '0%' }}
                        onClick={() => collectPlanet(planet.points, planet.id)} // Collect planet on click
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
            <img src={rocketImage} alt="Rocket" className="rocket" style={{ position: 'absolute', right: '10px', top: '0' }} />
        </div>
    );
};

export default Game;

