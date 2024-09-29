import React, { useState, useEffect } from 'react';
import './Game.css'; // Ensure this file exists
import planetImage from './images/planet.png';

const Game = ({ walletAddress }) => {
    const [score, setScore] = useState(0);
    const [isCollecting, setIsCollecting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            alert(`Time's up! Your score: ${score}`);
            resetGame();
        }
    }, [timeLeft]);

    useEffect(() => {
        const generatePlanets = () => {
            const newPlanet = {
                id: Date.now(),
                left: Math.random() * 100,
                top: Math.random() * 100,
            };
            setPlanets((prev) => [...prev, newPlanet]);
        };

        const interval = setInterval(() => {
            if (timeLeft > 0) {
                generatePlanets();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const handlePlanetClick = (id) => {
        setScore((prevScore) => prevScore + 1);
        setPlanets((prev) => prev.filter((planet) => planet.id !== id));
    };

    const resetGame = () => {
        setScore(0);
        setTimeLeft(30);
        setPlanets([]);
    };

    return (
        <div className="game-area">
            <h1>Space Planet Collection Game</h1>
            {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
            <p>Score: {score}</p>
            <p>Time Left: {timeLeft}s</p>
            <div className="planet-container">
                {planets.map((planet) => (
                    <img
                        key={planet.id}
                        src={planetImage}
                        alt="Planet"
                        className="planet"
                        style={{
                            left: `${planet.left}%`,
                            top: `${planet.top}%`,
                        }}
                        onClick={() => handlePlanetClick(planet.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Game;


