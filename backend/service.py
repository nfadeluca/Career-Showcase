from flask import Flask, send_file
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)



if __name__ == '__main__':
    app.run(debug=True)
