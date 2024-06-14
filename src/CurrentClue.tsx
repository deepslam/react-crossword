import { useContext } from 'react';
import styled from 'styled-components';
import { CrosswordContext } from './context';

const CurrentClueWrapper = styled.div.attrs((/* props */) => ({
  className: 'current-clue',
}))`
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  padding: 15px;
  border-radius: 5px;
  height: auto;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
  color: white;

  @media (max-width: ${(props) => props.theme.columnBreakpoint}) {
    width: 200px;
    max-height: 220px;
    padding: 10px;
    font-size: 10px;
  }
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
