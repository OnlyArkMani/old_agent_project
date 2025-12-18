from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import requests
import os
from mcp import mcp_decision
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend
load_dotenv()

# Configure Gemini 1.5 Flash
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
SERPAPI_KEY = os.getenv('SERPAPI_KEY')
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/query', methods=['POST'])
def query():
    try:
        data = request.get_json()
        user_query = data.get('query', '')
        if not user_query:
            return jsonify({'error': 'No query provided'}), 400

        # Use MCP to decide action
        action = mcp_decision(user_query)
        
        if action == 'search':
            response = perform_search(user_query)
        else:
            response = query_gemini(user_query)

        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': f"Server error: {str(e)}"}), 500

def query_gemini(query):
    try:
        response = model.generate_content(query)
        if not response.text:
            raise ValueError("Empty response from Gemini")
        return response.text
    except Exception as e:
        return f"Gemini API error: {str(e)}"

def perform_search(query):
    try:
        url = f"https://serpapi.com/search.json?q={query}&api_key={SERPAPI_KEY}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        results = data.get('organic_results', [])
        if results:
            return results[0].get('snippet', 'No results found')
        return 'No search results found'
    except requests.RequestException as e:
        return f"Search error: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)