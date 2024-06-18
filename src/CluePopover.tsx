/* eslint-disable react/function-component-definition */
import React, { ReactElement } from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import CurrentClue from './CurrentClue';

type CluePopoverProps = {
  withPopover: boolean;
  displayPopover: boolean;
  children?: ReactElement;
  onClickOutside?: () => void;
};

const CluePopover: React.FC<CluePopoverProps> = ({
  withPopover,
  displayPopover,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickOutside = () => {},
  children,
}) => {
  if (!children) {
    return null;
  }
  if (!withPopover) {
    return children;
  }
  return (
    <Popover
      isOpen={displayPopover}
      positions={['top']}
      onClickOutside={onClickOutside}
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
          style={{ zIndex: 100 }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <CurrentClue />
        </ArrowContainer>
      )}
    >
      {children}
    </Popover>
  );
};

export default CluePopover;
