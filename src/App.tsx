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

interface Good extends GoodWithoutColor {
  color: Color | null;
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

const goodsWithColors: Good[] = [];

const GoodsList: React.FC<{ goods: Good[] }> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        key={good.id}
        style={{ color: good.color?.name || 'black' }}
      >
        {good.name}
      </li>
    ))}
  </ul>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>
        Add todo form
        {colors.length}
        {goodsFromServer.length}
      </h1>

      <form>
        <input
          type="text"
          placeholder="Enter a good name"
          className="error"
        />

        <select
          className="error"
        >
          <option value="0" disabled>Choose a color</option>
        </select>

        <button type="submit">Add</button>
      </form>

      <GoodsList goods={goodsWithColors} />
    </div>
  );
};

export default App;
