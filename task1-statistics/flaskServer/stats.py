import enum
import pymongo
import datetime
import numpy as np 
from matplotlib import pyplot as plt 
import json
import pandas as pd
import matplotlib.pyplot as plt 
import dateutil
import matplotlib.dates as md
client = pymongo.MongoClient("mongodb+srv://moustakas:123123ASDmi@cluster0.giimj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = client.get_database("parking")

days = [
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]
daysDict = {
    "Monday":0,
    "Tuesday":0,
    "Wendesday":0,
    "Thursday":0,
    "Friday":0,
    "Saturday":0,
    "Sunday":0
}
# Wres kinisis
# Katilimenes thesis
today = datetime.date.today()
#previous_week = today - datetime.timedelta(days=7)
previous_week = today - datetime.timedelta(days=today.weekday())
def timestampStats():
    collection =  db.get_collection("Car").find({ })
    print("CURRENT WEEK "+ str(today) + "\tPREVIOUS WEEK " + str(previous_week) + "\n")
    for doc in collection:
        #print("ENTRY WEEK " + str(doc['entry'].date()))
        if doc['entry'].date() >= previous_week and doc['entry'].date() <= today:
            print("\tENTRY IN PREVIOUS WEEK " + str(doc['entry'].date()))
            daysDict[days[doc['entry'].weekday()]]+=1
        
    
    days2 = list(daysDict.keys())
    people = list(daysDict.values())
    #fig = plt.figure(figsize = (10, 5))
    
    # creating the bar plot
    #plt.bar(days2, people, color ='maroon',
           # width = 0.4)
    #print(json.dumps(people))
    #plt.xlabel("Courses offered")
    #plt.ylabel("No. of students enrolled")
    #plt.title("Students enrolled in different courses")
    print(json.dumps(daysDict))
    #plt.show()
    return daysDict

#Find from all the cars which day is used the most
def DayPercentage():
	data = db.get_collection("Car").find({ })
	print("Found cars")
	all_cars=0
	for doc in data:
		daysDict[days[doc['entry'].weekday()]]+=1
		all_cars+=1
	for temp in daysDict:
		daysDict[temp] = daysDict[temp] / all_cars
	return daysDict

