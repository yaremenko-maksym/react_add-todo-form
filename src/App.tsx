/* eslint-disable no-console */
import React, { useCallback, useMemo, useState } from 'react';

import './App.css';
import { GoodForm } from './GoodForm';
import { GoodsList } from './GoodsList';

import { Color } from './types/Color';
import { Good } from './types/Good';

import { colors } from './api/colors';
import { goods as goodsFromServer } from './api/goods';

function getColorById(colorId: number): Color | null {
  return colors.find(color => color.id === colorId)
    || null;
}

const goodsWithColors: Good[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

type Callback = (query: string) => void;
function debounce(f: Callback, delay: number): Callback {
  let timerId: NodeJS.Timeout;

  return (query: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      f(query);
    }, delay);
  };
}

const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>(goodsWithColors);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const addGood = useCallback((newGoodName: string, newColorId: number) => {
    const newGood: Good = {
      id: Date.now(),
      name: newGoodName,
      colorId: newColorId,
      color: getColorById(newColorId),
    };

    setGoods([...goods, newGood]);
  }, [goods]);

  const deleteGood = useCallback((goodId: number) => {
    setGoods(
      goods.filter(good => good.id !== goodId),
    );
  }, [goods]);

  const updateGood = useCallback((
    goodId: number,
    newName: string,
    newColorId: number,
  ) => {
    const index = goods.findIndex(good => good.id === goodId);
    const newGood: Good = {
      ...goods[index],
      name: newName,
      colorId: newColorId,
      color: getColorById(newColorId),
    };

    const newGoods = [...goods];

    newGoods[index] = newGood;

    setGoods(newGoods);
  }, [goods]);

  const lowerQuery = appliedQuery.toLowerCase();
  const visibleGoods: Good[] = useMemo(() => {
    return goods.filter(
      good => good.name.toLowerCase().includes(lowerQuery),
    );
  }, [goods, lowerQuery]);

  return (
    <div className="App">
      <button type="button" onClick={() => setCount(count + 1)}>
        {count}
      </button>

      <GoodForm onAdd={addGood} />

      <input
        type="text"
        value={query}
        onChange={event => {
          const { value } = event.target;

          setQuery(value);
          applyQuery(value);
        }}
      />

      <GoodsList
        goods={visibleGoods}
        onDelete={deleteGood}
        onUpdate={updateGood}
      />
    </div>
  );
};

export default App;
