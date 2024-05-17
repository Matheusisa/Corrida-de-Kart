import React from 'react';

const PlayerCard = ({ player }) => {
    return (
        <div className="player-card">
            <h3>{player.NOME}</h3>
            <p>Velocidade: {player.VELOCIDADE}</p>
            <p>Manobrabilidade: {player.MANOBRABILIDADE}</p>
            <p>Poder: {player.PODER}</p>
            <p>Pontos: {player.PONTOS}</p>
        </div>
    );
};

export default PlayerCard;
