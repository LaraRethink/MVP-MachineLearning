import numpy as np
import pickle

class Model:
    
    @staticmethod
    def carrega_modelo(path_scaler, path_modelo):
        scaler = pickle.load(open(path_scaler, 'rb'))
        model = pickle.load(open(path_modelo, 'rb'))
        return scaler, model
    
    @staticmethod
    def preditor(scaler, model, data):
        # parsing dos dados de entrada
        X_input = np.array([
            int(data['wifeAge']),
            int(data['wifeEducation']),
            int(data['husbandEducation']),
            int(data['numberOfChildrenEverBorn']),
            int(data['wifeReligion']),
            int(data['wifeNowWorking']),
            int(data['husbandOcupation']),
            int(data['standardOfLivingIndex']),
            int(data['mediaExposure'])
        ])
        
      # Aplica a mesma padronização ao dado de entrada
        X_input_padronizado = scaler.transform(X_input.reshape(1, -1))

      
        prediction = model.predict( X_input_padronizado)
        
        return int(prediction[0])
