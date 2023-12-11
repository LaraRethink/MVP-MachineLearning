
from model.modelo import Model
import pytest
import numpy as np

# To run: pytest -v test_modelos.py

@pytest.fixture
def model():
    # Carregue o modelo e o scaler antes de cada teste
    scaler, model = Model.carrega_modelo('modelo ML treinado/scaler_a.pkl', 'modelo ML treinado/modelo_treinado.pkl')
    return scaler, model

def test_preditor(model):
    # Dados de exemplo para teste
    data = {
        'wifeAge': 25,
        'wifeEducation': 3,
        'husbandEducation': 4,
        'numberOfChildrenEverBorn': 2,
        'wifeReligion': 1,
        'wifeNowWorking': 1,
        'husbandOcupation': 2,
        'standardOfLivingIndex': 3,
        'mediaExposure': 1
    }

    # Chama o método preditor com os dados de exemplo
    result = Model.preditor(*model, data)

    # Faz as asserções com base no resultado esperado
    assert isinstance(result, int)
    assert result in [1, 2, 3]  
    
    
