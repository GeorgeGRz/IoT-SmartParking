from flask_restful import Api, Resource, reqparse
from stats import *
from flask import jsonify
class HelloApiHandler(Resource):
  def get(self):
    print("hello")
    return {
      'resultStatus': 'SUCCESS',
      'message': timestampStats()
      }
