


# datos = pd.DataFrame({
#     "tipo":["super","tarea"],
#     "desc":["leche","estudiar"]
# })
# #Create engine
# engine= create_engine("postgresql+psycopg2://postgres:jaramillo35@/todo_list")
# #Send appending without index
# datos.to_sql("todo", if_exists="append",index=False, con= engine)
# engine.dispose()

import pandas as pd
from sqlalchemy import create_engine
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def main():
    #  return "HolaMundoFlask"
    return render_template("index.html")


@app.route("/api/consultar/<buscarTipo>")
def consultar(buscarTipo):
    if buscarTipo == "0":
        query = "select count(id) from alldata group by state order by state asc;"
    elif buscarTipo == "1":
        year=2015
        query = f"select count(id) from alldata where year={year} group by state order by state asc;"
    elif buscarTipo == "2":
        year=2016
        query = f"select count(id) from alldata where year={year} group by state order by state asc;"
    elif buscarTipo == "3":
        year=2017
        query = f"select count(id) from alldata where year={year} group by state order by state asc;"
    elif buscarTipo == "4":
        year=2018
        query = f"select count(id) from alldata where year={year} group by state order by state asc;"
    elif buscarTipo == "5":
        year=2019
        query = f"select count(id) from alldata where year={year} group by state order by state asc;"
    else:
        year=2020
        query = f"select count(id) from alldata where year={year} group by state order by state asc;"
    engine=create_engine("postgresql+psycopg2://postgres:jaramillo35@/Prueba")
    datos = pd.read_sql(query, engine)
    datos=datos["count"]
    engine.dispose()

    return datos.to_json(orient='records')
@app.route("/search/<a>")
def consult(a):
    if a == "0":
        query2 = "select year, count(id) from alldata  group by year order by year asc;"
   
    else:
        query2 = f"select year, count(id) from alldata where state='{a}'  group by year order by year asc;"
    engine2=create_engine("postgresql+psycopg2://postgres:jaramillo35@/Prueba")
    datos2 = pd.read_sql(query2, engine2)
    # datos=datos["count"]
    engine2.dispose()

    return datos2.to_json()
@app.route("/search2/<b>")   
def consulta(b):
    if b == "0":
        query3 = "select * from alldata ;"
    elif b == "1":
        year=2015
        query3 = f"select * from alldata where year={year} ;"
    elif b == "2":
        year=2016
        query3 = f"select * from alldata where year={year} ;"
    elif b == "3":
        year=2017
        query3 = f"select * from alldata where year={year} ;"
    elif b == "4":
        year=2018
        query3 = f"select * from alldata where year={year} ;"
    elif b == "5":
        year=2019
        query3 = f"select * from alldata where year={year} ;"
    else:
        year=2020
        query3 = f"select * from alldata where year={year} group by state order by state asc;"
    engine3=create_engine("postgresql+psycopg2://postgres:jaramillo35@/Prueba")
    datos3 = pd.read_sql(query3, engine3)
    
    engine3.dispose()

    return datos3.to_json(orient='records')
@app.route("/search3/<c>")
def consu(c):
    if c == "0":
        query4 = "select race, count(id) from alldata  group by race;"
   
    else:
        query4 = f"select race, count(id) from alldata where state='{c}'  group by race ;"
    engine4=create_engine("postgresql+psycopg2://postgres:jaramillo35@/Prueba")
    datos4 = pd.read_sql(query4, engine4)
    
    engine4.dispose()

    return datos4.to_json()

if __name__ == "__main__":
    app.run()