/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';

interface Color {
  id: number;
  name: string;
}

interface GoodWithoutColor {
  id: number;
  name: string;
  colorId: number;
}

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const goodsFromServer: GoodWithoutColor[] = [
  { id: 1, colorId: 1, name: 'Dumplings' },
  { id: 2, colorId: 2, name: 'Carrot' },
  { id: 3, colorId: 3, name: 'Eggs' },
  { id: 4, colorId: 1, name: 'Ice cream' },
  { id: 5, colorId: 2, name: 'Apple' },
  { id: 6, colorId: 3, name: 'Bread' },
  { id: 7, colorId: 1, name: 'Fish' },
  { id: 8, colorId: 2, name: 'Honey' },
  { id: 9, colorId: 3, name: 'Jam' },
  { id: 10, colorId: 1, name: 'Garlic' },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
      </p>
    </div>
  );
};

export default App;
