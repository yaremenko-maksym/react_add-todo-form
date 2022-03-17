/* eslint-disable no-console */
import React, { useCallback, useContext, useMemo, useState } from 'react';

import './App.css';
import { GoodForm } from './GoodForm';
import { GoodsList } from './GoodsList';

import { Good } from './types/Good';

import { GoodsContext } from './GoodsContext';

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

const MainContent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const { goods, deleteGood, updateGood } = useContext(GoodsContext);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const lowerQuery = appliedQuery.toLowerCase();
  const visibleGoods: Good[] = useMemo(() => {
    return goods.filter(
      good => good.name.toLowerCase().includes(lowerQuery),
    );
  }, [goods, lowerQuery]);

  return (
    <>
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
    </>
  )
}

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const { addGood } = useContext(GoodsContext);

  return (
    <div className="App">
      <header>
        <button type="button" onClick={() => setCount(count + 1)}>
          {count}
        </button>
      </header>

      <aside>
        <GoodForm onAdd={addGood} />
      </aside>

      <MainContent />

      <footer>Footer</footer>
    </div>
  );
};

export default App;
