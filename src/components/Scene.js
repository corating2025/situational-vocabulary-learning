import React, { useState } from 'react';
import { STABILITY_API_URL } from '../services/imageService';

function Scene() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('开始请求，API Key:', STABILITY_API_URL);
      
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${STABILITY_API_URL}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1
        }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`API错误: ${response.status} - ${responseText}`);
      }

      const result = JSON.parse(responseText);
      if (!result.artifacts || !result.artifacts[0]) {
        throw new Error('API返回数据格式错误');
      }

      const base64Image = result.artifacts[0].base64;
      setImage(`data:image/png;base64,${base64Image}`);
    } catch (error) {
      console.error('详细错误:', error);
      setError(error.message || '生成图像时出错，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scene">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="请输入图像描述..."
          style={{
            padding: '8px',
            marginRight: '10px',
            width: '300px'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '8px 16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '生成中...' : '生成图像'}
        </button>
      </form>
      {loading && <p>正在生成图像，请稍候...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {image && <img src={image} alt="生成的图像" style={{maxWidth: '100%', marginTop: '20px'}} />}
    </div>
  );
}

export default Scene; 