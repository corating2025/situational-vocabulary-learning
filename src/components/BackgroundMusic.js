import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const MusicButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
`;

function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 创建音频元素
    const audio = new Audio();
    audio.src = '/sounds/spring-nature.wav';
    audio.loop = true;
    audio.volume = 0.3;

    // 监听加载完成事件
    audio.addEventListener('loadeddata', () => {
      console.log('音频加载完成');
      setIsLoaded(true);
    });

    // 监听播放结束事件
    audio.addEventListener('ended', () => {
      console.log('音频播放结束');
      setIsPlaying(false);
    });

    // 监听错误事件
    audio.addEventListener('error', (e) => {
      console.error('音频加载错误:', e);
    });

    audioRef.current = audio;

    // 清理函数
    return () => {
      audio.pause();
      audio.src = '';
      audio.remove();
    };
  }, []);

  const handleClick = async () => {
    if (!audioRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // 尝试播放
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('播放失败:', error);
      // 如果是用户交互问题，可以提示用户
      if (error.name === 'NotAllowedError') {
        alert('请允许网页播放音频');
      }
    }
  };

  return (
    <MusicButton 
      onClick={handleClick}
      title={isPlaying ? "点击暂停背景音乐" : "点击播放背景音乐"}
      disabled={!isLoaded}
      style={{ opacity: isLoaded ? 1 : 0.5 }}
    >
      {isPlaying ? '🔇' : '🔊'}
    </MusicButton>
  );
}

export default BackgroundMusic; 