import React from 'react';
import Race from './Race';
import './App.css';

// Componente App
const App = () => {
    return (
        <div className="app">
            <h1>Corrida de Personagens</h1>
            <Race />
        </div>
    );
};

// Componente MyButton
function MyButton() {
    return (
        <button>
            I'm a button
        </button>
    );
}

// Exportando os componentes individualmente
export { App, MyButton };
