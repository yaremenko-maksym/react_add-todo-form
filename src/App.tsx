/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import React, { useState } from 'react';

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

function getColorById(colorId: number): Color | null {
  return colors.find(color => color.id === colorId)
    || null;
}

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

const goodsWithColors: Good[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

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

type GoodFormProps = {
  onAdd: (newGoodName: string, newColorId: number) => void,
}

const GoodForm: React.FC<GoodFormProps> = ({ onAdd }) => {
  const [goodName, setGoodName] = useState('');
  const [hasNameError, setNameError] = useState(false);

  const [colorId, setColorId] = useState(0);
  const [hasColorIdError, setColorIdError] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        setNameError(!goodName);
        setColorIdError(!colorId);

        if (colorId && goodName) {
          onAdd(goodName, colorId);
          setColorId(0);
          setGoodName('');
        }
      }}
    >
      <input
        type="text"
        placeholder="Enter a good name"
        className={hasNameError ? 'error' : ''}
        value={goodName}
        onChange={(event) => {
          setGoodName(event.target.value);
        }}
      />
      <select
        className={classNames({ error: hasColorIdError })}
        value={colorId}
        onChange={(event) => {
          setColorId(+event.target.value);
        }}
      >
        <option value="0" disabled>Choose a color</option>

        {colors.map(color => (
          <option
            key={color.id}
            value={color.id}
          >
            {color.name}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>(goodsWithColors);

  function addGood(newGoodName: string, newColorId: number): void {
    const newGood: Good = {
      id: Date.now(),
      name: newGoodName,
      colorId: newColorId,
      color: getColorById(newColorId),
    };

    setGoods([...goods, newGood]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <GoodForm onAdd={addGood} />
      <GoodsList goods={goods} />
    </div>
  );
};

export default App;
