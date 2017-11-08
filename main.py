import sys
import json
import logging
import pandas as pd

logging.basicConfig(filename='example.log',level=logging.DEBUG)

#df = pd.DataFrame(columns=['ARAGON1', 'CARLOS1', 'LEON1'])
df = pd.DataFrame()
#values = []

def send(code='message',info=None):
    print(json.dumps({'code':code,'info':info}))
    sys.stdout.flush()

    #values.append(str(info))
    #logging.info('Hola '+str(''.join(values)))
    #if(info != None):
    #    logging.info(str(info))
    

def startListening():
    send('ready')
    for line in iter(sys.stdin.readline, ''):
        message = json.loads(line)
        onMessage(message['code'],message['info'] if ('info' in message) else None)

def onMessage(code,info):
    #if(code == data):
    cols = []
    for nemo in info:
        cols.append(nemo+'_data')
        cols.append(nemo+'_date')
        #logging.info(str(nemo))
        #logging.info(str(info[nemo]))

    #df = pd.DataFrame(columns=cols)

    #df.loc[i] = []

    send('pong',info)

startListening()


