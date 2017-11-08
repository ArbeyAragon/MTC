'use strict';

var PyBridge = require('./PyBridge')
var pyBridge = new PyBridge('main.py')

const rxFirebase = require('rx-firebase');
const firebase = require('firebase');
const rx = require('rxjs');

rxFirebase.extend(firebase, rx.Observable);

var config = {
    apiKey: "AIzaSyDfq8UY5nh8zBN5pLR79azaGXec_07_7lE",
    authDomain: "mtcdb-912e6.firebaseapp.com",
    databaseURL: "https://mtcdb-912e6.firebaseio.com",
    projectId: "mtcdb-912e6",
    storageBucket: "mtcdb-912e6.appspot.com",
    messagingSenderId: "635396422651"
};

var firebaseApp = firebase.initializeApp(config);

const promise = firebase.auth().signInWithEmailAndPassword("arbey@gmail.com", "012345678")
promise.catch(err => console.log(err.message))

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log("Loggeado")
        auntenticado();
    }else{
        console.log('not logget in')
    }
});

var info = {};

function auntenticado(){
    var dbRef = firebase.database().ref().child("currentData");//.child("ARAGON1");
    dbRef.on('value',function(snap) {
        info = snap.val(); 
        /*
        console.log("-------------------------------------")
        console.log(info)
        /*if(data){
            let info = {
                datos: data.data,
                hora: data.date
            }
            pyBridge.send('ping',info)
        }/** */
    });
}


setInterval(function(){
    console.log("+++++++++++++++++++++++++++++++++++++++++++++")
    console.log(info)
    pyBridge.send('ping',info)
},3000)


/*
pyBridge.on('message',function(message){
    console.log('mensaje recivido:',message);
});/** */

pyBridge.on('ready',function(){
    console.log('++READY++');
})

pyBridge.on('pong',function(info){
    console.log('++pong recivido: ',info);
})

/*
var c = 0;
var d = 55;
setInterval(function(){
    console.log("-------------------------------------")
    console.log('mensaje enviado ');
    console.log(c)
    console.log(d)
    let info = {datos:++c,hora:++d}
    pyBridge.send('ping',info)
},5000)/** */