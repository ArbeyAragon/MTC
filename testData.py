import pyrebase
import datetime, time
import numpy as np
from time import sleep

config = {
    "apiKey": "AIzaSyDfq8UY5nh8zBN5pLR79azaGXec_07_7lE",
    "authDomain": "mtcdb-912e6.firebaseapp.com",
    "databaseURL": "https://mtcdb-912e6.firebaseio.com",
    "projectId": "mtcdb-912e6",
    "storageBucket": "mtcdb-912e6.appspot.com",
    "messagingSenderId": "635396422651"
}

firebase = pyrebase.initialize_app(config)

tableCurr = "currentData"

auth = firebase.auth()

user = auth.sign_in_with_email_and_password("arbey@gmail.com", "012345678")

db = firebase.database()

#db.child(table).remove(user['idToken'])
db.child(tableCurr).remove(user['idToken'])

act = ["ARAGON1","LEON1","CARLOS1"]
mus = [150, 250, 50]

activos = {}

for nemo, mu in zip(act, mus):
    activos[nemo] = mu

for i in range(60*60*24):
    for nemo in act:
        sleep(1)
        activos[nemo] = np.random.normal(activos[nemo], 0.1)
        data = {
            "data": activos[nemo],
            "date": time.mktime(datetime.datetime.now().timetuple())*1000,
        }
        #db.child(table).child(nemo).push(data, user['idToken'])
        db.child(tableCurr).child(nemo).update(data, user['idToken'])