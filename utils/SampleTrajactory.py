import json
import os
import datetime
from numpy import add
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
f = open(os.path.join(BASE_DIR ,'rennes/lampposts.geojson'), "r")
f2 = open(os.path.join(BASE_DIR ,'assets/data/simulation_playback_traffic.json'), "r")
timestamp = datetime.datetime.now(datetime.timezone.utc)
print(timestamp)

eachCoordinate = [1356082.098516423953697, 7225469.71107065398246] 
eachCoordinate2 = [1356089.323837267467752, 7225484.086015150882304]
trafficData = json.load(f2)
print(len(trafficData))
newTrafficJson = []
for eachData in trafficData:
    eachCoordinate = [x+2 for x in eachCoordinate]
    eachCoordinate2 = [x+2 for x in eachCoordinate2]
    timestamp = timestamp + datetime.timedelta(milliseconds=100)
    newDict = {"timestamp": timestamp.replace(tzinfo=None).isoformat() + 'Z', #eachData["timestamp"],
                "geoJson":{"type":"FeatureCollection",
                            "name":"Vehicle",
                            "crs": { 
                                        "type": "name", 
                                        "properties": { "name": "urn:ogc:def:crs:EPSG::3948" } 
                                    },
                        "features":[{"feature_type":["CAR", "CAR"], 
                                     "coordinates":[eachCoordinate, eachCoordinate2],
                                     "feature_id":[1, 2],
                                     "orientations":[eachData["geoJson"]["features"][0]["orientations"][0], eachData["geoJson"]["features"][0]["orientations"][1]],
                                     "type":"MultiPoint"}]}}
    newTrafficJson.append(newDict)

jsonString = json.dumps(newTrafficJson)
jsonFile = open(os.path.join(BASE_DIR ,'assets/data/sample_traffic2.json'), "w")
jsonFile.write(jsonString)
jsonFile.close()
print(len(newTrafficJson))