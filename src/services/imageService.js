const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// 预设的春天公园场景图片列表
const SPRING_IMAGES = [
  'https://images.pexels.com/photos/68147/pexels-photo-68147.jpeg',    // 阳光明媚的公园草地
  'https://images.pexels.com/photos/580900/pexels-photo-580900.jpeg',  // 春天公园的花朵和阳光
  'https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg',  // 阳光下的郁金香
  'https://images.pexels.com/photos/1416572/pexels-photo-1416572.jpeg', // 阳光透过树叶
  'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg'  // 春天阳光下的草地和花朵
];

export const generateImage = async () => {
  let lastError;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      // 随机选择一张图片
      const randomImage = SPRING_IMAGES[Math.floor(Math.random() * SPRING_IMAGES.length)];
      
      // 验证图片是否可访问
      const response = await fetch(randomImage, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error(`图片加载失败: ${response.status}`);
      }
      
      return randomImage;

    } catch (error) {
      console.error(`尝试 ${i + 1}/${MAX_RETRIES} 失败:`, error);
      lastError = error;
      
      if (i < MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
        continue;
      }
    }
  }

  throw new Error(`生成图像失败 (已重试 ${MAX_RETRIES} 次): ${lastError.message}`);
};

// 定义场景元素及其五感描述和位置
export const sceneElements = [
  {
    id: 'butterfly',
    word: 'butterfly',
    icon: '🦋',
    position: {
      top: '35%',
      left: '45%'
    },
    senses: {
      see: "I see a colorful butterfly dancing in the air.",
      hear: "I hear the soft flutter of butterfly wings.",
      smell: "I smell the fragrant flowers that attract the butterfly.",
      touch: "I feel the gentle breeze from the butterfly's wings.",
      taste: "I taste the sweet nectar that the butterfly seeks."
    }
  },
  {
    id: 'bee',
    word: 'bee',
    icon: '🐝',
    position: {
      top: '55%',
      left: '30%'
    },
    senses: {
      see: "I see a busy bee collecting nectar from the flowers.",
      hear: "I hear the gentle buzzing of the bee's wings.",
      smell: "I smell the sweet honey the bee is making.",
      touch: "I feel the air move as the bee flies past.",
      taste: "I taste the sweet honey that the bee produces."
    }
  },
  {
    id: 'bird',
    word: 'bird',
    icon: '🐦',
    position: {
      top: '25%',
      left: '70%'
    },
    senses: {
      see: "I see a little bird hopping on the grass.",
      hear: "I hear the bird's cheerful chirping.",
      smell: "I smell the fresh air where the bird flies.",
      touch: "I feel the soft feathers in the breeze.",
      taste: "I imagine the seeds the bird likes to eat."
    }
  },
  {
    id: 'flower',
    word: 'flower',
    icon: '🌸',
    position: {
      top: '65%',
      left: '40%'
    },
    senses: {
      see: "I see beautiful flowers blooming.",
      hear: "I hear bees buzzing around the flowers.",
      smell: "I smell the sweet fragrance of spring flowers.",
      touch: "I feel the soft petals.",
      taste: "I taste the sweet nectar in the air."
    }
  },
  {
    id: 'sun',
    word: 'sun',
    icon: '☀️',
    position: {
      top: '15%',
      left: '20%'
    },
    senses: {
      see: "I see the bright sun shining in the sky.",
      hear: "I hear the warmth in the gentle breeze.",
      smell: "I smell the warm spring air.",
      touch: "I feel the sun's warmth on my face.",
      taste: "I taste the freshness of the sunny spring day."
    }
  },
  {
    id: 'grass',
    word: 'grass',
    icon: '🌱',
    position: {
      top: '75%',
      left: '60%'
    },
    senses: {
      see: "I see green grass swaying in the breeze.",
      hear: "I hear the grass rustling in the wind.",
      smell: "I smell the fresh cut grass.",
      touch: "I feel the soft grass beneath my feet.",
      taste: "I taste the freshness of spring in the air."
    }
  }
];

export default generateImage;