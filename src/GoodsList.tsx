/* eslint-disable no-console */
import React, { useState } from 'react';

import { GoodForm } from './GoodForm';
import { Good } from './types/Good';

export type Props = {
  goods: Good[],
  onDelete: (goodId: number) => void,
  onUpdate: (goodId: number, newName: string, newColorId: number) => void,
};

export const GoodsList: React.FC<Props> = React.memo(
  ({
    goods, onDelete, onUpdate,
  }) => {
    const [selectedGoodId, setSelectedGoodId] = useState(0);

    console.log('Render GoodsList');

    return (
      <ul>
        {goods.map(good => (
          <li
            key={good.id}
            style={{ color: good.color?.name || 'black' }}
          >
            {selectedGoodId === good.id ? (
              <GoodForm
                good={good}
                onAdd={(name: string, colorId: number) => {
                  onUpdate(good.id, name, colorId);
                  setSelectedGoodId(0);
                }}
              />
            ) : (
              <>
                {good.name}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedGoodId(good.id);
                  }}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onDelete(good.id);
                  }}
                >
                  x
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  },
);
