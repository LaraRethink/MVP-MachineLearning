from flask import Flask, request, jsonify
import numpy as np
from model import Model
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Rota para receber dados do frontend e retornar previsões
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Recebe os dados do frontend
        data = request.json
        
        # Caminhos para os arquivos do scaler e do modelo
        path_scaler = 'modelo ML treinado/scaler_a.pkl'
        path_modelo = 'modelo ML treinado/modelo_treinado.pkl'

       # Carregando scaler e modelo
        scaler, modelo = Model.carrega_modelo(path_scaler, path_modelo)
        
        # Fazendo a previsão
        prediction = Model.preditor(scaler, modelo, data)

        return jsonify({'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)