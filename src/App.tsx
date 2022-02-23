/* eslint-disable @typescript-eslint/no-unused-vars */
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

const getColorById = (colorId: number) => {
  return colors.find(color => color.id === colorId)
    || null;
};

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

const App: React.FC = () => {
  const [newGoodName, setNewGoodName] = useState('');
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [goods, setGoods] = useState(goodsWithColors);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newGood: Good = {
      id: Date.now(),
      name: newGoodName,
      colorId: selectedColorId,
      color: getColorById(selectedColorId),
    };

    setGoods([...goods, newGood]);
  };

  return (
    <div className="App">
      <h1>
        Add todo form
      </h1>

      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          defaultValue={newGoodName}
          placeholder="Enter a good name"
          onChange={event => setNewGoodName(event.target.value)}
        />

        <select
          value={selectedColorId}
          onChange={event => setSelectedColorId(+event.target.value)}
        >
          <option value="0" disabled>Choose a color</option>

          {colors.map(color => (
            <option value={color.id} key={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>

      <GoodsList goods={goods} />
    </div>
  );
};

export default App;
