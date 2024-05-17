import React from 'react';

const RaceLog = ({ log }) => {
    return (
        <div className="race-log">
            {log.map((entry, index) => (
                <p key={index}>{entry}</p>
            ))}
        </div>
    );
};

export default RaceLog;
