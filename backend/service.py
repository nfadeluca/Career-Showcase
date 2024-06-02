from flask import Flask, send_file, request, jsonify
import traceback
from flask_cors import CORS
import os
from gpt_library.query import create_response

app = Flask(__name__)
CORS(app)

@app.route('/api/ask_nick', methods=['POST'])
def ask_nick():
    try:
        data = request.get_json()
        query = data.get('query', '')

        if not query:
            return jsonify({'error': 'No query provided'}), 400

        response = create_response(query)
        return jsonify({'response': response})

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
