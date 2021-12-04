import os
from flask import Flask, send_from_directory
from flask import jsonify
app = Flask(__name__,  static_url_path='',static_folder='../reactApp/build')
from stats import *
from api import *
# Serve React App
#@app.route('/', defaults={'path': ''})
#@app.route('/<path:path>')
#def serve(path):
#    if path != "" and os.path.exists(app.static_folder + '/' + path):
#        return send_from_directory(app.static_folder, path)
#    else:
#        return send_from_directory(app.static_folder, 'index.html')

api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/statistics')



if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)