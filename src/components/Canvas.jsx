import React from 'react';
import PropTypes from 'prop-types';
import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
import Leaderboard from './Leaderboard';
import { signIn } from 'auth0-web';

const Canvas = (props) => {
    const gameHeight = 1200;
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
    const leaderboard = [
        { id: 'd4', maxScore: 82, name: 'Willie Poh', picture: 'https://twitter.com/HardDriveMag/status/1664617872323141635/photo/1',},
        { id: 'a6', maxScore: 100, name: 'Tharshen', picture: 'https://twitter.com/Whemn1/status/1664625017403985923/photo/1',},
        { id: '3t', maxScore: 28, name: 'WeiJie', picture: 'https://twitter.com/9to5mac/status/1701752096045896123/photo/1',},
        { id: '71', maxScore: 37, name: 'Aiken', picture: 'https://twitter.com/DaniDevYT/status/1701650631948214393/photo/1',},
        { id: 'h1', maxScore: 42, name: 'JunYing', picture: 'https://twitter.com/laufey/status/1701886713398788223/photo/1',},
        { id: '0a', maxScore: 61, name: 'Janelle', picture: 'https://twitter.com/URedditor/status/1701668946389156205/photo/2',},
    ]

    return (
        <svg 
            id = "aliens-go-rumah-canvas"
            preserveAspectRatio="xMaxYMax none"
            onMouseMove={props.trackMouse}
            viewBox={viewBox}
        >
            <defs> 
                <filter id = "shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" />
                </filter>
            </defs>
            <Sky />
            <Ground />
            <CannonPipe rotation={props.angle} />
            <CannonBase />
            <CurrentScore score = {15} />

            { ! props.gameState.started && 
                <g>
                    <StartGame onClick={() => props.startGame()} />
                    <Title />
                    <Leaderboard currentPlayer = {leaderboard[0]} authenticate={signIn} leaderboard={leaderboard} />
                </g>
            }

            {props.gameState.flyingObjects.map(flyingObject => (
                <FlyingObject
                    key = {flyingObject.id}
                    position = {flyingObject.position}
                />
            ))}
        </svg>
    );
};

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }).isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    trackMouse: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
};

export default Canvas;