# from crypt import methods
from flask import Flask, render_template, jsonify, make_response, request
import flask
# from flask_restplus import Api, Resource, fields
from flask_cors import CORS

import pickle
import numpy as np
# from PIL import Image
import json
import warnings
warnings.simplefilter("ignore")

app = Flask(__name__)
CORS(app, resources={r"/prediction": {"origins": "http://localhost:port"}})


def predict(values):
    if len(values) == 10:
        model = pickle.load(open('models/model_final.pkl', 'rb'))
        values = np.asarray(values)
        print(values)
        return model.predict(values.reshape(1, -1))[0]


def options():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


@app.route("/prediction", methods=['POST', 'GET'])
def prediction():
    print('called prediction function')
    args = request.args
    White_Blood_Cell = (args.get('White_Blood_Cell'))
    Blood_Urea = (args.get('Blood_Urea'))
    Blood_Glucose_Random = (args.get('Blood_Glucose_Random'))
    Serum_creatine = (args.get('Serum_creatine'))
    Packed_cell_volume = (args.get('Packed_cell_volume'))
    Albumin = (args.get('Albumin'))
    Haemoglobin = (args.get('Haemoglobin'))
    Age = (args.get('Age'))
    Sugar = (args.get('Sugar'))
    Hypertension = (args.get('Hypertension'))

    data = [float(White_Blood_Cell), float(Blood_Urea), float(Blood_Glucose_Random), float(Serum_creatine),
            float(Packed_cell_volume), float(Albumin), float(Haemoglobin), float(Age), float(Sugar), float(Hypertension)]

    prediction = predict(data)

    print(data)
    print([type(i) for i in data])

    types = {0: "/NPredict",
                1: "/YPredict"}
    print(types[prediction])
    print(prediction)
    response = flask.jsonify({
        "statusCode": 200,
        "status": "Prediction made",
        "predicted": str(prediction),
        "result": str(types[prediction])
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(response)
    return (response)
    # try:
    #     formData = request.json
    #     print(formData)
    #     # print(data)
    #     # print(formData)
    #     print([type(i) for i in formData])

    #     data = []
    #     data.append(float(formData['White_Blood_Cell']))
    #     data.append(float(formData['Blood_Urea']))
    #     data.append(float(formData['Blood_Glucose_Random']))
    #     data.append(float(formData['Serum_creatine']))
    #     data.append(float(formData['Packed_cell_volume']))
    #     data.append(float(formData['Albumin']))
    #     data.append(float(formData['Haemoglobin']))
    #     data.append(float(formData['Age']))
    #     data.append(float(formData['Sugar']))
    #     data.append(float(formData['Hypertension']))

    #     prediction = predict(data)

    #     print(data)
    #     print([type(i) for i in data])

    #     types = {0: "/NPredict",
    #                 1: "/YPredict"}
    #     print(types[prediction])
    #     print(prediction)
    #     response = jsonify({
    #         "statusCode": 200,
    #         "status": "Prediction made",
    #         "predicted": str(prediction),
    #         "result": str(types[prediction])

    #     })

    #     print(response)

    #     response.headers.add("Access-Control-Allow-Origin", "*")
    #     response.headers.add('Access-Control-Allow-Headers', "*")
    #     response.headers.add('Access-Control-Allow-Methods', "*")
    #     return response
    # except Exception as error:
    #     return jsonify({
    #         "statusCode": 500,
    #         "status": "Could not make prediction",
    #         "error": str(error)
    #     })


if __name__ == '__main__':
    app.run(debug=True)
