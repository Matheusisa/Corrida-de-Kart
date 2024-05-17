import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import RaceLog from '../RaceLog';

const players = {
    player1: {
        NOME: "Mario",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0,
    },
    player2: {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
    },
    // Adicione outros jogadores aqui
};

const rollDice = () => Math.floor(Math.random() * 6) + 1;

const getRandomBlock = () => {
    let random = Math.random();
    if (random < 0.33) return "RETA";
    if (random < 0.66) return "CURVA";
    return "CONFRONTO";
};

const Race = () => {
    const [log, setLog] = useState([]);
    const [player1, setPlayer1] = useState(players.player1);
    const [player2, setPlayer2] = useState(players.player2);

    const logRollResult = (characterName, block, diceResult, attribute) => {
        setLog((prevLog) => [
            ...prevLog,
            `${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`,
        ]);
    };

    const playRaceEngine = async (character1, character2) => {
        for (let round = 1; round <= 5; round++) {
            setLog((prevLog) => [...prevLog, `🏁 Rodada ${round}`]);

            let block = getRandomBlock();
            setLog((prevLog) => [...prevLog, `Bloco: ${block}`]);

            let diceResult1 = rollDice();
            let diceResult2 = rollDice();

            let TotalTestSkill1 = 0;
            let TotalTestSkill2 = 0;

            if (block === "RETA") {
                TotalTestSkill1 = diceResult1 + character1.VELOCIDADE;
                TotalTestSkill2 = diceResult2 + character2.VELOCIDADE;

                logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
                logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
            }

            if (block === "CURVA") {
                TotalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
                TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

                logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
                logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
            }

            if (block === "CONFRONTO") {
                let powerResult1 = diceResult1 + character1.PODER;
                let powerResult2 = diceResult2 + character2.PODER;

                setLog((prevLog) => [...prevLog, `${character1.NOME} confrontou com ${character2.NOME}! 🤼‍♂️🦾`]);

                logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
                logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

                if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                    setLog((prevLog) => [...prevLog, `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`]);
                    character2.PONTOS--;
                }

                if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                    setLog((prevLog) => [...prevLog, `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`]);
                    character1.PONTOS--;
                }

                if (powerResult1 === powerResult2) {
                    setLog((prevLog) => [...prevLog, "Embate empatado! Nenhum ponto foi perdido"]);
                }
            }

            if (TotalTestSkill1 > TotalTestSkill2) {
                setLog((prevLog) => [...prevLog, `${character1.NOME} marcou um ponto`]);
                character1.PONTOS++;
            } else if (TotalTestSkill2 > TotalTestSkill1) {
                setLog((prevLog) => [...prevLog, `${character2.NOME} marcou um ponto`]);
                character2.PONTOS++;
            }

            setLog((prevLog) => [...prevLog, "_____________"]);
        }

        declareWinner(character1, character2);
    };

    const declareWinner = (character1, character2) => {
        setLog((prevLog) => [
            ...prevLog,
            "Resultado final:",
            `${character1.NOME}: ${character1.PONTOS} ponto(s)`,
            `${character2.NOME}: ${character2.PONTOS} ponto(s)`,
        ]);

        if (character1.PONTOS > character2.PONTOS) {
            setLog((prevLog) => [...prevLog, `\n${character1.NOME} venceu a corrida! Parabéns 🏆`]);
        } else if (character2.PONTOS > character1.PONTOS) {
            setLog((prevLog) => [...prevLog, `\n${character2.NOME} venceu a corrida! Parabéns 🏆`]);
        } else {
            setLog((prevLog) => [...prevLog, "A corrida terminou em empate"]);
        }
    };

    return (
        <div className="race">
            <h1>Corrida de Personagens</h1>
            <div className="players">
                <PlayerCard player={player1} />
                <PlayerCard player={player2} />
            </div>
            <button onClick={() => playRaceEngine(player1, player2)}>Iniciar Corrida</button>
            <RaceLog log={log} />
        </div>
    );
};

export default Race;
