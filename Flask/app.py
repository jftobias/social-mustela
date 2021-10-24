from flask import Flask, json, render_template, request
from flask.helpers import url_for
from flask.wrappers import Request
from werkzeug.exceptions import RequestHeaderFieldsTooLarge, RequestTimeout
from werkzeug.routing import RequestPath, RequestRedirect
from werkzeug.utils import redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from config import config
import time
import os

dbdir = "sqlite:///" + os.path.abspath(os.getcwd()) + "/database.db"

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = dbdir
app.config["SQLALCHEMY_TRAKE_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String)
    apellido = db.Column(db.String)
    correo = db.Column(db.String, unique=True)
    contraseña = db.Column(db.String)
    telefono = db.Column(db.Integer)

@app.route('/')
@app.route('/index/')
@app.route('/home/')
def paginaFront():
    usuario = False
    return render_template("PaginaFront.html", usuario=usuario)

@app.route("/registrar/")
def registrar():
    return render_template("Registrar.html")

@app.route("/registrar_/", methods=["POST"])
def registrar_():
    contraseñaC = generate_password_hash(request.form["contraseña"], method="sha256")
    User = request.form['usuario']
    apellido = request.form['apellido']
    correo = request.form['correo']
    telefono = request.form['telefono']
    if (validarDuplicado(correo)):
        user = Usuario(usuario = User, apellido = apellido, correo = correo, contraseña = contraseñaC, telefono = telefono)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("paginaFront"))
    else:
        err = True
        return render_template("Registrar.html", err = err)

def validarDuplicado(correo):
    pase = True
    listado = Usuario.query.all()
    for i in listado:
        if i.correo == correo:
            pase = False
    print(pase)
    return pase

def function():

    return 
@app.route("/iniciarSeccion/")
def iniciarSeccion():
    lista = Usuario.query.all()
    return render_template("IniciarSeccion.html")

@app.route("/iniciarSeccion_/", methods=["POST"])
def iniciarSeccion_():
    pase = False
    correo = request.form["correo"]
    contraseña = request.form["contraseña"]
    listado = Usuario.query.all()
    for i in listado:
        if i.correo == correo and check_password_hash(i.contraseña, contraseña):
            pase = True
            break
    if pase == True:
        return redirect(url_for("paginaFront"))
    else:
        erro = False
        return render_template("IniciarSeccion.html", error = pase)

@app.route("/usuario/")
def usuario():
    return render_template("Usuario.html")

@app.route("/recuperarContraseña/")
def recuperarContraseña():
    return render_template("RecuperarContraseña.html")

def paginaNoExiste(error):
    return "<h1>No se encontro la pagina</h1>"

if __name__=='__main__':
    db.create_all()
    app.config.from_object(config['development'])
    app.register_error_handler(404, paginaNoExiste)
    app.run()