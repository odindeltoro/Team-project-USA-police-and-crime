from flask import Flask, render_template,redirect,jsonify 
from flask_pymongo import PyMongo  
from pymongo import MongoClient        
import pandas as pd

# Create an instance of Flask
app = Flask(__name__)  

# Use PyMongo to establish Mongo connection
# conn = "mongodb://localhost:27017"
# client = pymongo.MongoClient(conn)
# db = client.FBI
# print(db)
mongo = PyMongo(app, uri="mongodb://localhost:27017/FBI")
print(mongo)

# Declare an app function that will return data
@app.route("/")    
def index():    
    return render_template('index.html')

@app.route("/readData", methods=["GET"])
def getData():
    getArrestCrime = pd.DataFrame(mongo.ArrestCrime.find())
    print(getArrestCrime)
    region = list(getArrestCrime.states.region)
    state = list(getArrestCrime.states.state)
    crime = list(getArrestCrime.states.crime)
    arrest = list(getArrestCrime.states.arrest)
    population = list(getArrestCrime.states.population)
    year = list(getArrestCrime.year)
    trace = {'region':region,"state":state,"crime":crime,"arrest":arrest,"population":population,"year":year}
    return jsonify(trace)

if __name__ == "__main__":    
    app.run(debug=True)  
