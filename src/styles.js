import styled from 'styled-components';

export const SceneContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f0f9ff;
`;

export const IconButton = styled.button`
  position: absolute;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export const WordCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 1000;
`;

export const SensesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const SenseIcon = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #e0e0e0;
  }
`;

export const SenseText = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
`; 