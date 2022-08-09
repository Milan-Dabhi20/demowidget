import json
import os
from numpy import add
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
f = open(os.path.join(BASE_DIR ,'rennes/Addresses.geojson'), "r")
f2 = open(os.path.join(BASE_DIR ,'assets/data/simulation_playback_traffic.json'), "r")
data = json.load(f)
addressCoordinates = []

for feature in data["features"]:
    addressCoordinates.append(feature["geometry"]["coordinates"])
    if len(addressCoordinates) == 500:
        break
 #   print(feature["geometry"]["coordinates"])


trafficData = json.load(f2)
print(len(trafficData))
newTrafficJson = []
for eachData, eachCoordinate in zip(trafficData, addressCoordinates):
    newDict = {"timestamp":eachData["timestamp"],
                "geoJson":{"type":"FeatureCollection",
                        "features":[{"feature_type":["SUV"], 
                                     "coordinates":[eachCoordinate],
                                     "feature_id":[1],
                                     "orientation":[eachData["geoJson"]["features"][0]["orientations"][2]],
                                     "type":"Point"}]}}
    newTrafficJson.append(newDict)
    
jsonString = json.dumps(newTrafficJson)
jsonFile = open(os.path.join(BASE_DIR ,'assets/data/sample_traffic.json'), "w")
jsonFile.write(jsonString)
jsonFile.close()