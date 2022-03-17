import React, { useState, useCallback } from 'react';

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

export const GoodsContext = React.createContext<{
  goods: Good[],
  addGood: (newGoodName: string, newColorId: number) => void,
  deleteGood: (goodId: number) => void,
  updateGood: (goodId: number, newName: string, newColorId: number) => void,
}>({
  goods: [],
  addGood(newGoodName: string, newColorId: number) {},
  deleteGood(goodId: number) {},
  updateGood(goodId: number, newName: string, newColorId: number) {},
});

export const GoodsContextProvider: React.FC = ({ children }) => {
  const [goods, setGoods] = useState<Good[]>(goodsWithColors);

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

  const contextValue = {
    goods,
    addGood,
    deleteGood,
    updateGood,
  };

  return (
    <GoodsContext.Provider value={contextValue}>
      {children}
    </GoodsContext.Provider>
  )
}
