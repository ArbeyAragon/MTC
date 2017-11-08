/* ĵshint node:true */
'use strict'

var PythonShell = require('python-shell')
var EventEmitter = require('events').EventEmitter

class PyBridge extends EventEmitter{
    constructor(file){
        super()
        this.pyshell = new PythonShell(file,{mode:'json',args:['-u']})

        this.pyshell.on('message', (message)=> {
            console.log("+++++++++++ Enviado a python ++++++++++")
            this.emit('message',message)
            this.emit(message.code,message.info)
        })
    }

    end(){
        this.pyshell.end(err=>{
            if (err)
                throw err;
        })
    }

    send(code,info){
        /*console.log("#####################")
        console.log({
            code:code || 'message',
            info:info || null,
        })/** */
        this.pyshell.send({
            code:code || 'message',
            info:info || null
        })
    }
}


module.exports = PyBridge