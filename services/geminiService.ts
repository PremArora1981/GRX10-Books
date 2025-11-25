import { Invoice } from '../types';

export const sendMessageToGemini = async (userMessage: string, history: any[]) => {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        }))
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.text || 'AI request failed');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error calling AI service:', error);
    return "I'm having trouble connecting to the server right now. Please ensure the backend is running.";
  }
};