import React, { useState, useEffect } from 'react';
import './Game.css';
import rocketImage from './images/rocket.png'; // Rocket image
import planetImage from './images/planet.png'; // Planet image

const Game = ({ walletAddress }) => {
    const [score, setScore] = useState(0);
    const [isCollecting, setIsCollecting] = useState(false);
    const [planets, setPlanets] = useState([]);
    const [timer, setTimer] = useState(30);
    const [showWalletAddress, setShowWalletAddress] = useState('');

    useEffect(() => {
        if (walletAddress) {
            setShowWalletAddress(walletAddress);
        }
    }, [walletAddress]);

    useEffect(() => {
        let interval;
        if (isCollecting && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsCollecting(false);
            alert('Time is up! Your final score is: ' + score);
        }
        return () => clearInterval(interval);
    }, [isCollecting, timer]);

    const startCollecting = () => {
        setIsCollecting(true);
        setScore(0);
        setTimer(30);
        generatePlanets();
    };

    const generatePlanets = () => {
        const newPlanet = {
            id: Date.now(),
            points: Math.floor(Math.random() * 10) + 1, // Random points for each planet
            left: Math.random() * 90, // Random horizontal position
        };
        setPlanets((prevPlanets) => [...prevPlanets, newPlanet]);
    };

    const collectPlanet = (points, id) => {
        setScore((prevScore) => prevScore + points);
        setPlanets((prevPlanets) => prevPlanets.filter((planet) => planet.id !== id));
        generatePlanets(); // Generate a new planet after collecting one
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
            <div className="controls">
                <button onClick={startCollecting} disabled={isCollecting}>
                    {isCollecting ? 'Collecting...' : 'Start Collecting'}
                </button>
                <p>Score: {score}</p>
                <p>Time Remaining: {timer}s</p>
                <button onClick={claimPoints}>Claim Points</button>
            </div>
            {walletAddress ? (
                <img src={rocketImage} alt="Rocket" className="rocket" style={{ position: 'absolute', right: '10px', top: '0' }} />
            ) : (
                <p>Please connect your wallet!</p>
            )}
        </div>
    );
};

export default Game;


