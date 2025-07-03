from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import time

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Invalid file type'}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    df = pd.read_csv(filepath)
    stats = df.describe().to_dict()

    return jsonify({
        'filename': file.filename,
        'upload_time': time.strftime("%Y-%m-%d %H:%M:%S"),
        'data': df.to_dict(orient='records'),
        'columns': df.columns.tolist(),
        'summary': stats
    })

if __name__ == '__main__':
    app.run(debug=True)
