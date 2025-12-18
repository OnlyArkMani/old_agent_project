export default function ResponseDisplay({ response }) {
  const speak = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(response);
    utter.lang = 'en-US';
    synth.speak(utter);
  };

  if (!response) return null;

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded">
      <h2 className="font-bold text-lg mb-2">Bot Response:</h2>
      <p className="whitespace-pre-wrap">{response}</p>
      <button
        onClick={speak}
        className="mt-4 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-white"
      >
        🔊 Hear it
      </button>
    </div>
  );
}
