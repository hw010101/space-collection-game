import React, { useState, useEffect } from 'react';
import rocketImage from './images/rocket.png'; // Rocket image
import planetImage from './images/planet.png'; // Planet image

const Game = ({ walletAddress }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
    const [isCollecting, setIsCollecting] = useState(false);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        let timer;
        if (isCollecting && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        if (timeLeft === 0) {
            setIsCollecting(false);
            alert(`Time's up! Your score: ${score}`);
        }
        return () => clearInterval(timer);
    }, [isCollecting, timeLeft]);

    const startCollecting = () => {
        setIsCollecting(true);
        setScore(0);
        setTimeLeft(60);
        generatePlanets();
    };

    const generatePlanets = () => {
        const newPlanets = [];
        for (let i = 0; i < 5; i++) {
            newPlanets.push({
                id: Math.random(), // Use random ID for uniqueness
                points: Math.floor(Math.random() * 100) + 1,
                position: {
                    x: Math.random() * 400,
                    y: Math.random() * 400,
                },
            });
        }
        setPlanets(newPlanets);
    };

    const collectPlanet = (points) => {
        setScore(prev => prev + points);
        setPlanets(planets.filter(p => p.points !== points));
        generatePlanets(); // Generate new planets after collecting
    };

    const claimPoints = () => {
        alert('Points claimed as SRS tokens!');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '2px solid #000', borderRadius: '10px', padding: '20px', position: 'relative', width: '500px', height: '500px', overflow: 'hidden' }}>
                <h1>Space Planet Collection Game</h1>
                <img src={rocketImage} alt="Rocket" style={{ width: '150px', marginBottom: '20px' }} />
                {walletAddress ? (
                    <div>
                        <button onClick={startCollecting} disabled={isCollecting}>
                            {isCollecting ? 'Collecting...' : 'Start Game'}
                        </button>
                        <p>Score: {score}</p>
                        <p>Time Left: {timeLeft}s</p>
                        <button onClick={claimPoints}>Claim Points</button>
                        {planets.map(planet => (
                            <img
                                key={planet.id}
                                src={planetImage}
                                alt="Planet"
                                style={{
                                    width: '50px',
                                    position: 'absolute',
                                    left: planet.position.x,
                                    top: planet.position.y,
                                    cursor: 'pointer',
                                }}
                                onClick={() => collectPlanet(planet.points)}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Please connect your wallet!</p>
                )}
            </div>
        </div>
    );
};

export default Game;


