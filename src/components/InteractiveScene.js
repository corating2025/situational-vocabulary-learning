import React, { useState } from 'react';
import styled from 'styled-components';

const ElementIcon = styled.div`
  position: absolute;
  cursor: pointer;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
`;

const SensesCard = styled.div`
  position: absolute;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 250px;
  z-index: 10;
`;

const Word = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const SensesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SenseItem = styled.li`
  margin: 8px 0;
  color: #666;
`;

function InteractiveScene({ imageUrl, elements }) {
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <div style={{ position: 'relative' }}>
      <img src={imageUrl} alt="Spring Scene" style={{ width: '100%' }} />
      
      {elements.map((element) => (
        <ElementIcon
          key={element.id}
          style={{ top: element.position.top, left: element.position.left }}
          onClick={() => setSelectedElement(element)}
        >
          {element.icon}
        </ElementIcon>
      ))}
      
      {selectedElement && (
        <SensesCard>
          <Word>{selectedElement.word}</Word>
          <SensesList>
            {Object.entries(selectedElement.senses).map(([sense, description]) => (
              <SenseItem key={sense}>
                {description}
              </SenseItem>
            ))}
          </SensesList>
        </SensesCard>
      )}
    </div>
  );
}

export default InteractiveScene; 