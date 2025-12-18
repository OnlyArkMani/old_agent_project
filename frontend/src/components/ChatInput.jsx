import { useState } from 'react';

export default function ChatInput({ onSubmit, loading }) {
  const [input, setInput] = useState('');

  const handleTextSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input);
    setInput('');
  };

  const handleSpeech = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
      onSubmit(speechResult);
    };

    recognition.onerror = (event) => {
      alert('Speech recognition error: ' + event.error);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full p-4 rounded bg-gray-800 text-white"
        rows="3"
        placeholder="Type your message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div className="flex gap-4">
        <button
          onClick={handleTextSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
        <button
          onClick={handleSpeech}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
        >
          🎤 Speak
        </button>
      </div>
    </div>
  );
}
