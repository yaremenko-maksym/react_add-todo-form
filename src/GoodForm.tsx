import React, { useState } from 'react';
import classNames from 'classnames';

import { colors } from './api/colors';
import { Good } from './types/Good';

type Props = {
  // eslint-disable-next-line react/require-default-props
  good?: Good | null,
  onAdd: (newGoodName: string, newColorId: number) => void,
};

export const GoodForm: React.FC<Props> = React.memo(
  ({
    good = null,
    onAdd,
  }) => {
    const [goodName, setGoodName] = useState(good?.name || '');
    const [hasNameError, setNameError] = useState(false);

    const [colorId, setColorId] = useState(good?.colorId || 0);
    const [hasColorIdError, setColorIdError] = useState(false);

    // eslint-disable-next-line no-console
    console.log('Render GoodForm');

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
            setNameError(false);
          }}
        />

        <select
          className={classNames({ error: hasColorIdError })}
          value={colorId}
          onChange={(event) => {
            setColorId(+event.target.value);
            setColorIdError(false);
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
  },
);
