import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Popover, ArrowContainer } from 'react-tiny-popover';

import { CrosswordContext, CrosswordSizeContext } from './context';
import type { UsedCellData, EnhancedProps } from './types';
import CurrentClue from './CurrentClue';

let previousNumber = '';

const cellPropTypes = {
  /** the data specific to this cell */
  cellData: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    guess: PropTypes.string, // .isRequired,
    number: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,

  /** whether this cell has focus */
  focus: PropTypes.bool,

  /** whether this cell is highlighted */
  highlight: PropTypes.bool,

  /** handler called when the cell is clicked */
  onClick: PropTypes.func,

  /** whether this cell is correct */
  isCorrect: PropTypes.bool,
};

export type CellProps = EnhancedProps<
  typeof cellPropTypes,
  {
    /** the data specific to this cell */
    cellData: UsedCellData;
    /** handler called when the cell is clicked */
    onClick?: (cellData: UsedCellData) => void;
  }
>;

/**
 * An individual-letter answer cell within the crossword grid.
 *
 * A `Cell` lives inside the SVG for a
 * [`CrosswordGrid`](#/Complex%20layouts/CrosswordGrid), and renders at a
 * position determined by the `row`, `col`, and `cellSize` properties from
 * `cellData` and `renderContext`.
 */
export default function Cell({
  cellData,
  onClick,
  focus,
  highlight,
  isCorrect,
}: CellProps) {
  const { cellSize, cellPadding, cellInner, cellHalf, fontSize } =
    useContext(CrosswordSizeContext);
  const {
    // gridBackground,
    cellBackground,
    cellBorder,
    textColor,
    numberColor,
    focusBackground,
    correctBackground,
    highlightBackground,
  } = useContext(ThemeContext);
  const { selectedNumber, selectedDirection, selectedPosition } =
    useContext(CrosswordContext);

  const handleClick = useCallback<React.MouseEventHandler>(
    (event) => {
      event.preventDefault();
      if (onClick) {
        onClick(cellData);
      }
    },
    [cellData, onClick]
  );

  const [isPopoverOpened, setIsPopoverOpened] = useState<boolean>(false);
  const { row, col, guess, number, answer } = cellData;

  useEffect(() => {
    if (!number) return;

    if (previousNumber !== selectedNumber && previousNumber !== '') {
      if (isPopoverOpened) {
        setIsPopoverOpened(false);
      }
    }

    setIsPopoverOpened(highlight === true);
    previousNumber = selectedNumber;
  }, [selectedNumber, selectedDirection, selectedPosition]);

  const x = col * cellSize;
  const y = row * cellSize;

  return (
    <Popover
      isOpen={isPopoverOpened}
      positions={['top']}
      onClickOutside={() => setIsPopoverOpened(false)}
      padding={5}
      // eslint-disable-next-line react/no-unstable-nested-components
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowSize={10}
          arrowColor="black"
          arrowStyle={{ opacity: 0.7 }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <CurrentClue />
        </ArrowContainer>
      )}
    >
      <g
        onClick={handleClick}
        style={{ cursor: 'default', fontSize: `${fontSize}px` }}
        className="clue-cell"
      >
        <rect
          x={x + cellPadding}
          y={y + cellPadding}
          width={cellInner}
          height={cellInner}
          fill={
            isCorrect
              ? correctBackground
              : focus
              ? focusBackground
              : highlight
              ? highlightBackground
              : cellBackground
          }
          stroke={cellBorder}
          strokeWidth={cellSize / 50}
        />
        {number && (
          <text
            x={x + cellPadding * 4}
            y={y + cellPadding * 4}
            textAnchor="start"
            dominantBaseline="hanging"
            style={{ fontSize: '50%', fill: numberColor }}
          >
            {number}
          </text>
        )}
        <text
          x={x + cellHalf}
          y={y + cellHalf + 1} // +1 for visual alignment?
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: textColor }}
          className={
            answer === guess ? 'guess-text-correct' : 'guess-text-incorrect'
          }
        >
          {guess}
        </text>
      </g>
    </Popover>
  );
}

Cell.propTypes = cellPropTypes;

Cell.defaultProps = {
  focus: false,
  highlight: false,
  onClick: null,
  isCorrect: false,
};

// export default Cell;
