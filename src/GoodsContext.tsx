import React, { useState, useCallback, useReducer } from 'react';

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

type AddGoodAction = {
  type: 'addGood',
  payload: {
    goodName: string,
    colorId: number,
  }
};

type DeleteGoodAction = {
  type: 'deleteGood',
  payload: {
    goodId: number,
  }
}

type UpdateGoodAction = {
  type: 'updateGood',
  payload: {
    goodId: number,
    goodName: string,
    colorId: number,
  }
}

type Action = AddGoodAction | DeleteGoodAction | UpdateGoodAction;

const initialState = {
  goods: goodsWithColors,
};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'addGood':
      const newGood: Good = {
        id: Date.now(),
        name: action.payload.goodName,
        colorId: action.payload.colorId,
        color: getColorById(action.payload.colorId),
      };

      return {
        ...state,
        goods: [...state.goods, newGood],
      };

    case 'deleteGood': {
      const { goodId } = action.payload;

      return {
        ...state,
        goods: state.goods.filter(good => good.id !== goodId)
      }
    }


    case 'updateGood': {
      const index = state.goods.findIndex(good => good.id === action.payload.goodId);
      const newGood: Good = {
        ...state.goods[index],
        name: action.payload.goodName,
        colorId: action.payload.colorId,
        color: getColorById(action.payload.colorId),
      };

      const newGoods = [...state.goods];

      newGoods[index] = newGood;

      return {
        ...state,
        goods: newGoods,
      };
    }

    default:
      return state;
  }
}

export const GoodsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addGood = useCallback((newGoodName: string, newColorId: number) => {
    dispatch({
      type: 'addGood',
      payload: {
        goodName: newGoodName,
        colorId: newColorId,
      }
    });
  }, []);

  const deleteGood = useCallback((goodId: number) => {
    dispatch({
      type: 'deleteGood',
      payload: { goodId },
    });
  }, []);

  const updateGood = useCallback((
    goodId: number,
    newName: string,
    newColorId: number,
  ) => {
    dispatch({
      type: 'updateGood',
      payload: {
        goodId,
        goodName: newName,
        colorId: newColorId,
      },
    })
  }, []);

  const contextValue = {
    goods: state.goods,
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
