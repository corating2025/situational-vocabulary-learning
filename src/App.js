import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { generateImage } from './services/imageService';
import SpringHunt from './components/SpringHunt';
import SpringSenses from './components/SpringSenses';
import BackgroundMusic from './components/BackgroundMusic';

const SceneContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${props => props.imageUrl ? `url(${props.imageUrl}) center/cover no-repeat` : '#f0f8ff'};
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const SceneElement = styled.div`
  position: absolute;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
  z-index: 2;

  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.4));
  }
`;

const WordCard = styled.div`
  position: absolute;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  min-width: 250px;
  z-index: 3;
`;

const WordTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const SpeakButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SensesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SenseIcon = styled.div`
  cursor: pointer;
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

const SenseText = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333;
`;

const sceneElements = [
  {
    id: 'butterfly',
    word: {
      starter: 'butterfly',
      levelOne: 'butterfly'
    },
    icon: '🦋',
    position: { top: '25%', left: '35%' },
    senses: {
      starter: {
        see: "A beautiful butterfly!",
        hear: "Flutter flutter!",
        smell: "Sweet flower smell!",
        touch: "Gentle wing breeze!"
      },
      levelOne: {
        see: "I see a colorful butterfly dancing in the air.",
        hear: "I hear the soft flutter of butterfly wings.",
        smell: "I smell the fragrant flowers that attract the butterfly.",
        touch: "I feel the gentle breeze from the butterfly's wings."
      }
    }
  },
  {
    id: 'bee',
    word: {
      starter: 'bee',
      levelOne: 'bee'
    },
    icon: '🐝',
    position: { top: '45%', right: '25%' },
    senses: {
      starter: {
        see: "A busy bee!",
        hear: "Buzz buzz!",
        smell: "Sweet honey!",
        touch: "Moving air!"
      },
      levelOne: {
        see: "I see a busy bee collecting nectar.",
        hear: "I hear the gentle buzzing sound.",
        smell: "I smell sweet honey.",
        touch: "I feel the air move as it flies by."
      }
    }
  },
  {
    id: 'flower',
    word: {
      starter: 'flower',
      levelOne: 'flower'
    },
    icon: '🌸',
    position: { bottom: '25%', left: '20%' },
    senses: {
      starter: {
        see: "Pretty flowers!",
        smell: "Sweet smell!",
        touch: "Soft petals!"
      },
      levelOne: {
        see: "I see beautiful pink petals.",
        smell: "I smell sweet fragrance.",
        touch: "I feel soft petals."
      }
    }
  },
  {
    id: 'sun',
    word: {
      starter: 'sun',
      levelOne: 'sun'
    },
    icon: '☀️',
    position: { top: '10%', left: '10%' },
    senses: {
      starter: {
        see: "Bright sun!",
        feel: "Warm sunshine!"
      },
      levelOne: {
        see: "I see the bright sun shining.",
        feel: "I feel warm sunlight on my skin."
      }
    }
  },
  {
    id: 'bug',
    word: {
      starter: 'bug',
      levelOne: 'bug'
    },
    icon: '🐞',
    position: { top: '55%', left: '25%' },
    senses: {
      starter: {
        see: "A red bug!",
        hear: "Tiny steps!",
        touch: "Small and smooth!",
        smell: "Fresh leaves!"
      },
      levelOne: {
        see: "I see a little red bug crawling on the leaf.",
        hear: "I hear tiny footsteps on the leaf.",
        touch: "I feel its smooth shell.",
        smell: "I smell the fresh leaves it lives on."
      }
    }
  },
  {
    id: 'tree',
    word: {
      starter: 'tree',
      levelOne: 'tree'
    },
    icon: '🌳',
    position: { top: '30%', right: '15%' },
    senses: {
      starter: {
        see: "A tall tree!",
        hear: "Rustling leaves!",
        smell: "Fresh wood!",
        touch: "Rough bark!"
      },
      levelOne: {
        see: "I see a tall tree with green leaves.",
        hear: "I hear the leaves rustling in the wind.",
        smell: "I smell the fresh wood and leaves.",
        touch: "I feel the rough bark under my hands."
      }
    }
  },
  {
    id: 'swan',
    word: {
      starter: 'swan',
      levelOne: 'swan'
    },
    icon: '🦢',
    position: { bottom: '35%', right: '40%' },
    senses: {
      starter: {
        see: "White swan!",
        hear: "Gentle splash!",
        touch: "Soft feathers!",
        smell: "Fresh water!"
      },
      levelOne: {
        see: "I see a graceful white swan swimming.",
        hear: "I hear gentle splashing in the water.",
        touch: "I feel its soft white feathers.",
        smell: "I smell the fresh water around it."
      }
    }
  },
  {
    id: 'fish',
    word: {
      starter: 'fish',
      levelOne: 'fish'
    },
    icon: '🐠',
    position: { bottom: '30%', right: '60%' },
    senses: {
      starter: {
        see: "Colorful fish!",
        hear: "Splash splash!",
        smell: "Fresh water!",
        touch: "Cool water!"
      },
      levelOne: {
        see: "I see a colorful fish swimming in the water.",
        hear: "I hear splashing as it swims.",
        smell: "I smell the fresh water of the pond.",
        touch: "I feel the cool water where it swims."
      }
    }
  }
];

const LevelSwitch = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 4;
`;

const LevelButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedSense, setSelectedSense] = useState(null);
  const [level, setLevel] = useState('starter');

  const handleGenerateImage = async () => {
    try {
      setLoading(true);
      setError(null);
      const imageData = await generateImage();
      setImageUrl(imageData);
    } catch (error) {
      console.error('生成图像失败:', error);
      setError('生成图像时出错，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateImage();
  }, []);

  const speak = (text) => {
    // 取消所有正在播放的语音
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // 设置语音属性
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // 添加错误处理
    utterance.onerror = (event) => {
      console.error('语音合成错误:', event);
    };

    // 确保在语音列表加载完成后再播放
    const playVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // 尝试找到合适的英语女声
        const voice = voices.find(v => 
          v.lang.includes('en') && 
          (v.name.includes('Female') || v.name.includes('Google'))
        ) || voices[0];
        
        utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      } else {
        // 如果没有找到语音，使用默认设置
        window.speechSynthesis.speak(utterance);
      }
    };

    // 如果语音列表已加载，直接播放
    if (window.speechSynthesis.getVoices().length > 0) {
      playVoice();
    } else {
      // 否则等待语音列表加载完成
      window.speechSynthesis.onvoiceschanged = playVoice;
    }
  };

  // 在组件加载时初始化语音系统
  useEffect(() => {
    // 预加载语音系统
    const initSpeech = () => {
      window.speechSynthesis.getVoices();
    };

    // 尝试初始化
    initSpeech();

    // 监听语音列表变化
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = initSpeech;
    }

    // 组件卸载时清理
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleElementClick = (element) => {
    setSelectedElement(selectedElement?.id === element.id ? null : element);
    setSelectedSense(null);
    speak(element.word[level]);
  };

  const handleSenseClick = (sense) => {
    setSelectedSense(selectedSense === sense ? null : sense);
    if (selectedElement && selectedElement.senses[level][sense]) {
      speak(selectedElement.senses[level][sense]);
    }
  };

  const senseIcons = {
    see: '👀',
    hear: '👂',
    smell: '👃',
    touch: '🤚',
    taste: '👅'
  };

  return (
    <SceneContainer imageUrl={imageUrl}>
      <SpringHunt speak={speak} />
      <SpringSenses speak={speak} />
      <BackgroundMusic />
      <LevelSwitch>
        <LevelButton 
          active={level === 'starter'} 
          onClick={() => setLevel('starter')}
        >
          Starter
        </LevelButton>
        <LevelButton 
          active={level === 'levelOne'} 
          onClick={() => setLevel('levelOne')}
        >
          Level 1
        </LevelButton>
      </LevelSwitch>

      {loading && (
        <LoadingOverlay>
          <div>加载中...</div>
        </LoadingOverlay>
      )}
      
      {error && (
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          color: 'red', 
          background: 'white', 
          padding: '10px', 
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {error}
        </div>
      )}

      {sceneElements.map(element => (
        <React.Fragment key={element.id}>
          <SceneElement
            style={element.position}
            onClick={() => handleElementClick(element)}
          >
            {element.icon}
          </SceneElement>

          {selectedElement?.id === element.id && (
            <WordCard style={{
              ...element.position,
              transform: 'translate(40px, 40px)'
            }}>
              <WordTitle>
                <h3>{element.word[level]}</h3>
                <SpeakButton onClick={() => speak(element.word[level])}>
                  🔊
                </SpeakButton>
              </WordTitle>
              <SensesContainer>
                {Object.entries(senseIcons).map(([sense, icon]) => (
                  element.senses[level][sense] && (
                    <SenseIcon
                      key={sense}
                      className={selectedSense === sense ? 'active' : ''}
                      onClick={() => handleSenseClick(sense)}
                    >
                      {icon}
                    </SenseIcon>
                  )
                ))}
              </SensesContainer>
              {selectedSense && element.senses[level][selectedSense] && (
                <SenseText>
                  {element.senses[level][selectedSense]}
                  <SpeakButton 
                    onClick={() => speak(element.senses[level][selectedSense])}
                    style={{ marginLeft: '10px', fontSize: '1.2rem' }}
                  >
                    🔊
                  </SpeakButton>
                </SenseText>
              )}
            </WordCard>
          )}
        </React.Fragment>
      ))}
    </SceneContainer>
  );
}

export default App;