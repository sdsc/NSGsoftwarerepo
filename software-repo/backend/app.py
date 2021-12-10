from flask import Flask, jsonify
from listTools import get_tools_from_db
from scrape import scrape_tools
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
CORS(app)
limiter = Limiter(
    app,
    key_func=get_remote_address,
)


@app.route("/")
def home():
    return "NSG Software Repo API"


@app.route("/tools", methods=["GET"])
@limiter.limit("50/minute")
def get_tools():
    return jsonify(get_tools_from_db())


@app.route("/portal_tools", methods=["GET"])
@limiter.limit("100/minute")
def portal_tools():
    return scrape_tools()
