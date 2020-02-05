# -*- coding: utf-8 -*-

from app import app
from flask import request, render_template, redirect, jsonify, g, send_from_directory
import os
import config
import utils


@app.route("/", methods=['GET'])
def hello():
    return render_template('index.html')


@app.route("/music", methods=['GET'])
def music():
    musicList = utils.buildPlaylistForJS()
    return render_template('music.html', globalList=str(musicList))


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/music/<path:path>')
def mp3(path):
    return send_from_directory(os.path.join(app.root_path, 'static','music'),
                               path, mimetype='audio/mpeg')