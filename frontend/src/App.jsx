import { useState } from 'react';
import ChatInput from './components/ChatInput';
import ResponseDisplay from './components/ResponseDisplay';

export default function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (inputText) => {
    setQuery(inputText);
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('http://localhost:5000/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputText })
      });
      const data = await res.json();
      if (data.response) setResponse(data.response);
      else setResponse('Error: No response received.');
    } catch (err) {
      setResponse('Error contacting backend.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Agentic Chatbot 🤖</h1>
      <ChatInput onSubmit={handleSubmit} loading={loading} />
      <ResponseDisplay response={response} />
    </div>
  );
}
