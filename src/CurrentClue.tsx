import { useContext } from 'react';
import styled from 'styled-components';
import { CrosswordContext } from './context';

const CurrentClueWrapper = styled.div.attrs((/* props */) => ({
  className: 'current clue wrapper',
}))`
  width: 100%;
  padding: 7px;
  height: 50px;
  box-sizing: border-box;
  bottom: -50px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  position: absolute;
`;

function CurrentClue() {
  const { selectedNumber, clues } = useContext(CrosswordContext);
  if (!selectedNumber || !clues) {
    return null;
  }
  let clue = clues.across.find((c) => c.number === selectedNumber);
  if (!clue) {
    clue = clues.down.find((c) => c.number === selectedNumber);
  }
  if (!clue) {
    return null;
  }
  return <CurrentClueWrapper dangerouslySetInnerHTML={{ __html: clue.clue }} />;
}

export default CurrentClue;
