


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
# @app.route("/search/<buscar>")
# def consult(buscarTipo):
#     # if buscarTipo == "0":
#     #     query = "select * from allyears"
#     # elif buscarTipo == "1":
#     #     query = " select * from years where year=2015"
#     # elif buscarTipo == "2":
#     #     query = " select * from years where year=2016"
#     # elif buscarTipo == "3":
#     #     query = " select * from years where year=2017"
#     # elif buscarTipo == "4":
#     #     query = " select * from years where year=2018"
#     # elif buscarTipo == "5":
#     #     query = " select * from years where year=2019"
#     # else:
#     #     query = " select * from years where year=2020"
#     query = "select * from todo"
#     engine=create_engine("postgresql+psycopg2://postgres:jaramillo35@/todo_list")
#     datos = pd.read_sql(query, engine)
#     # datos=datos["count"]
#     engine.dispose()

#     return datos.to_json(orient='records')
    
if __name__ == "__main__":
    app.run()