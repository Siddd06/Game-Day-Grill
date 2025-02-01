from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
  return render_template("index.html")

@app.route('/index.html')
def home():
  return render_template("index.html")

@app.route('/about.html')
def about():
  return render_template("about.html")

@app.route('/book.html')
def book():
  return render_template("book.html")

@app.route('/menu.html')
def menu():
  return render_template("menu.html")

@app.route('/cart.html')
def cart():
  return render_template("cart.html")

@app.route('/order.html')
def order():
  return render_template("order.html")

app.run(host='0.0.0.0', port=81)
