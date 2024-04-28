from flask import Flask, abort, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app, origins=['0.0.0.0:8080'])

genai.configure(api_key=os.environ['GOOGLE_API_KEY'])
model = genai.GenerativeModel('gemini-pro')

def gemini(q):
    return model.generate_content(q)

@app.route('/llm', methods=['GET', 'POST'])
def llm():
    if request.method == "POST":
        try:
            data = request.get_json()
            response = gemini(data['query'])
            return {"data": response.text}
        except Exception as e:
            print(e)
            abort(500) 
    else:
        abort(405)
 
if __name__ == '__main__':
    app.run()
