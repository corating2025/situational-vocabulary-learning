import React, { useState } from 'react';
import styled from 'styled-components';

const SensesContainer = styled.div`
  position: fixed;
  right: 20px;
  top: calc(40vh + 40px);
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 350px;
  max-height: calc(60vh - 60px);
  overflow-y: auto;
  z-index: 5;
`;

const SensesTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const CategoryTitle = styled.h3`
  color: #2c3e50;
  margin: 20px 0 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #eee;
`;

const SensesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SenseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  background: ${props => props.checked ? '#e8f5e9' : '#f5f5f5'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const CheckBox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const ItemText = styled.span`
  flex: 1;
  font-size: 1rem;
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

const ItemIcon = styled.span`
  font-size: 2rem;
  margin-right: 10px;
`;

const sensesCategories = {
  smell: [
    { text: 'A flower', chinese: '一朵花', icon: '🌸' },
    { text: 'Fresh air', chinese: '新鲜空气', icon: '🌬️' },
    { text: 'Grass', chinese: '青草', icon: '🌱' }
  ],
  taste: [
    { text: 'Some fruit', chinese: '一些水果', icon: '🍎' }
  ],
  see: [
    { text: 'Birds flying', chinese: '鸟儿飞翔', icon: '🦅' },
    { text: 'Green grass', chinese: '绿草', icon: '🌿' },
    { text: 'Flowers blooming', chinese: '花朵绽放', icon: '🌺' },
    { text: 'Swans flapping their wings', chinese: '天鹅拍打翅膀', icon: '🦢' },
    { text: 'Fish swimming', chinese: '鱼儿游泳', icon: '🐠' },
    { text: 'Leaves budding', chinese: '树叶发芽', icon: '🌱' },
    { text: 'Butterflies dancing', chinese: '蝴蝶翩翩起舞', icon: '🦋' },
    { text: 'Bugs', chinese: '小虫子', icon: '🐞' }
  ],
  hear: [
    { text: 'Birds singing/chirping', chinese: '鸟儿歌唱/啾啾', icon: '🎵' },
    { text: 'Water running/flowing', chinese: '流水声', icon: '💧' },
    { text: 'Bees buzzing', chinese: '蜜蜂嗡嗡', icon: '🐝' },
    { text: 'Frogs croaking', chinese: '青蛙呱呱', icon: '🐸' },
    { text: 'Swans hooting', chinese: '天鹅鸣叫', icon: '🦢' }
  ],
  move: [
    { text: 'Go for a hike/walk', chinese: '去远足/散步', icon: '🚶' },
    { text: 'Roll down a grassy hill', chinese: '从草坡上滚下来', icon: '⛰️' },
    { text: 'Lay on the grass', chinese: '躺在草地上', icon: '🌿' },
    { text: 'Run through a garden', chinese: '跑过花园', icon: '🏃' },
    { text: 'Dance in the wind', chinese: '在风中跳舞', icon: '💃' }
  ],
  touch: [
    { text: '3 different stones', chinese: '3块不同的石头', icon: '🪨' },
    { text: 'Tree bark', chinese: '树皮', icon: '🌳' },
    { text: '4 different leaves', chinese: '4片不同的树叶', icon: '🍃' },
    { text: 'Feel the soil with hands', chinese: '用手感受泥土', icon: '🌱' },
    { text: '5 different flowers', chinese: '5朵不同的花', icon: '🌸' }
  ]
};

const categoryTitles = {
  smell: { en: 'Smell', zh: '闻一闻' },
  taste: { en: 'Taste', zh: '尝一尝' },
  see: { en: 'See', zh: '看一看' },
  hear: { en: 'Hear', zh: '听一听' },
  move: { en: 'Move', zh: '动一动' },
  touch: { en: 'Touch', zh: '摸一摸' }
};

const MainTitle = styled.h1`
  position: fixed;
  right: 20px;
  top: -10px;
  color: #2c3e50;
  font-size: 1.5rem;
  background: white;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 6;
`;

function SpringSenses({ speak }) {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const toggleItem = (text) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(text)) {
      newCheckedItems.delete(text);
    } else {
      newCheckedItems.add(text);
      speak(text);
    }
    setCheckedItems(newCheckedItems);
  };

  return (
    <>
      <MainTitle>Spring Scavenger Hunt 春季寻宝游戏</MainTitle>
      <SensesContainer>
        <SensesTitle>Spring Senses 春天的感知</SensesTitle>
        {Object.entries(sensesCategories).map(([category, items]) => (
          <div key={category}>
            <CategoryTitle>
              {categoryTitles[category].en} {categoryTitles[category].zh}
            </CategoryTitle>
            <SensesList>
              {items.map(({ text, chinese, icon }) => (
                <SenseItem key={text} checked={checkedItems.has(text)}>
                  <CheckBox
                    type="checkbox"
                    checked={checkedItems.has(text)}
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
                </SenseItem>
              ))}
            </SensesList>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
          *You can count! (可以数一数)
        </div>
      </SensesContainer>
    </>
  );
}

export default SpringSenses; 