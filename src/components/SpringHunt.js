import React, { useState } from 'react';
import styled from 'styled-components';

const HuntContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 350px;
  max-height: 40vh;
  overflow-y: auto;
  z-index: 5;
`;

const HuntTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const HuntList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HuntItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: ${props => props.found ? '#e8f5e9' : '#f5f5f5'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const ItemText = styled.span`
  flex: 1;
  font-size: 1.1rem;
  color: #333;
  display: flex;
  flex-direction: column;
`;

const EnglishText = styled.span`
  margin-bottom: 2px;
`;

const ChineseText = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ItemIcon = styled.span`
  font-size: 2rem;
  margin-right: 10px;
`;

const SpeakButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const huntItems = [
  { 
    text: 'something green', 
    hint: 'Look for leaves or plants', 
    icon: '🌿',
    chinese: '绿色的东西'
  },
  { 
    text: 'something red', 
    hint: 'Look for flowers or berries', 
    icon: '🌹',
    chinese: '红色的东西'
  },
  { 
    text: 'a bug', 
    hint: 'Look for small insects', 
    icon: '🐞',
    chinese: '一只虫子'
  },
  { 
    text: 'a puddle', 
    hint: 'Look for water on the ground', 
    icon: '💧',
    chinese: '一滩水'
  },
  { 
    text: 'something feathery', 
    hint: 'Look for birds', 
    icon: '🪶',
    chinese: '有羽毛的东西'
  },
  { 
    text: 'a rock', 
    hint: 'Look on the ground', 
    icon: '🪨',
    chinese: '一块石头'
  },
  { 
    text: 'something smelly', 
    hint: 'Use your nose', 
    icon: '👃',
    chinese: '有味道的东西'
  },
  { 
    text: 'a bud', 
    hint: 'Look for new growth', 
    icon: '🌱',
    chinese: '一个花蕾'
  },
  { 
    text: 'something making noise', 
    hint: 'Listen carefully', 
    icon: '🔊',
    chinese: '会发出声音的东西'
  },
  { 
    text: 'something flying', 
    hint: 'Look in the air', 
    icon: '🦋',
    chinese: '会飞的东西'
  },
  { 
    text: 'something planted', 
    hint: 'Look in the garden', 
    icon: '🌱',
    chinese: '种植的东西'
  },
  { 
    text: 'a flower', 
    hint: 'Look for colorful blooms', 
    icon: '🌸',
    chinese: '一朵花'
  },
  { 
    text: 'something yellow', 
    hint: 'Look for bright colors', 
    icon: '💛',
    chinese: '黄色的东西'
  },
  { 
    text: 'smooth bark', 
    hint: 'Feel the tree trunk', 
    icon: '🌳',
    chinese: '光滑的树皮'
  },
  { 
    text: 'a tree with flowers', 
    hint: 'Look up at the trees', 
    icon: '🌺',
    chinese: '开花的树'
  },
  { 
    text: 'something brown', 
    hint: 'Look for earth tones', 
    icon: '🟫',
    chinese: '棕色的东西'
  }
];

function SpringHunt({ speak }) {
  const [foundItems, setFoundItems] = useState(new Set());

  const toggleItem = (text) => {
    const newFoundItems = new Set(foundItems);
    if (newFoundItems.has(text)) {
      newFoundItems.delete(text);
    } else {
      newFoundItems.add(text);
      speak(text);
    }
    setFoundItems(newFoundItems);
  };

  return (
    <HuntContainer>
      <HuntTitle>First Trial 初体验</HuntTitle>
      <HuntList>
        {huntItems.map(({ text, hint, icon, chinese }) => (
          <HuntItem key={text} found={foundItems.has(text)}>
            <CheckBox 
              type="checkbox"
              checked={foundItems.has(text)}
              onChange={() => toggleItem(text)}
            />
            <ItemIcon>{icon}</ItemIcon>
            <ItemText>
              <EnglishText>{text}</EnglishText>
              <ChineseText>{chinese}</ChineseText>
            </ItemText>
            <SpeakButton onClick={() => speak(text)}>
              🔊
            </SpeakButton>
          </HuntItem>
        ))}
      </HuntList>
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
        *You can count! (可以数一数)
      </div>
    </HuntContainer>
  );
}

export default SpringHunt; 