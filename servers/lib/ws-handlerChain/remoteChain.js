/**
  * afterloe - cynomy_portal_server/servers/lib/ws-handlerChain/remoteChain.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <lm6289511@gmail.com> (https://github.com/afterloe)
  * Date:
  *   2017-2-15 15:01:59
  */
"use strict";

const [co, {resolve}] = [require("co"), require("path")];
const root = resolve(__dirname, "..", "..", "..");
const [Chain, {getScript}] = [require(resolve(root, "tools", "chain")), require(resolve(__dirname, "..", "scriptsCenter"))];
const DATANODES = Symbol("DATANODES");

module[DATANODES] = new Map();

function handlerMsg4Str(message, origin) {
  if ("utf8" === message.type) {
  	const ws = module[DATANODES].get(origin);
    try {
    	const [ladp, sh, command] = message.utf8Data.split("->");
    	console.log("%s: %s %s", ladp, sh, command);
    	const [_, __] = command.split(/(?:\()(.*)(?:\))/i);

    	const script = getScript(sh, _);
    	co(function* () {
    		const args = __? __.split("|"):null;
    		if (args) {
    			args.map((p,i) => args[i] = JSON.parse(p));
    		}

    		return yield script.apply(null, args);
    	}).then(data => {
    		ws.connection.sendUTF(JSON.stringify({
    			info: `${new Date().toLocaleString()}: [SUCCESS] receive message`,
    			type: `${sh}->${_}`,
    			_: data,
    		}));
    	}).catch(err => {
    		throw err;
    	});
    } catch (err) {
    	ws.connection.sendUTF(JSON.stringify({
    		info: `${new Date().toLocaleString()}: [FAILED] execute.`,
    		type: "error",
    		msg: err.message
    	}));
    }
  } else {
    return Chain.next();
  }
}

function handlerMsg4Binary(message, origin) {
  if ("binary" === message.type) {
    console.log("Received Binary Message from %s", origin);
    console.log("Received Binary Message of %s bytes.", message.binaryData.length);
  } else {
    return Chain.next();
  }
}

const [utf8, binary] = [new Chain(handlerMsg4Str), new Chain(handlerMsg4Binary)];
utf8.setNext(binary);

process.on("sendRemotesInfo", (message, callback) => {
  const {type, _} = message;
  for (let ws of module[DATANODES].values()) {
    ws.connection.sendUTF(JSON.stringify({
      info: `${new Date().toLocaleString()}: push an new message`,
      date: Date.now(),
      type,
      _,
    }));
  }

  if (callback instanceof Function) {
    callback();
  }
});

process.on("sendOneRemoteInfo", (origin, message, callback) => {
  const {type, _} = message;
  
  if (module[DATANODES].has(origin)) {
    const ws = module[DATANODES].get(origin);
    ws.connection.sendUTF(JSON.stringify({
      info: `${new Date().toLocaleString()}: push an new message`,
      date: Date.now(),
      type,
      _,
    }));

    if (callback instanceof Function) {
      callback();
    }

    return ;
  }
  if (callback instanceof Function) {
    callback(new Error("don't have this origin"));
  }
});

module.exports = function(protocol, request, origin) {
  if ("remote-protocol" === protocol) {
    const connection = request.accept(protocol, origin);
  	console.log("%s one node is connection. %s", new Date().toLocaleString(), request.remoteAddress);

  	module[DATANODES].set(origin, {
  		connection,
  		ip: request.remoteAddress,
  	});

    console.log("%s now we have %s data node.", new Date().toLocaleString(), module[DATANODES].size);

    connection.on("close", () => {
      console.log("%s data node client is hang-up. %s", new Date().toLocaleString(), request.remoteAddress);
	  module[DATANODES].delete(origin);
    });

    connection.on("message", message => utf8.passRequest(message, origin));
  } else {
    return Chain.next();
  }
};
