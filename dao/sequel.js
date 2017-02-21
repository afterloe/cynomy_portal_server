/**
  * afterloe - cynomy_portal_server/dao/sequel.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-1-16 20:11:17
  */
"use strict";

const [{resolve}, {MongoClient, ObjectId}, {format}] = [require("path"), require("mongodb"), require("url")];
const [{get}, SQLCONFIG ,CONNECTION] = [require(resolve(__dirname, "..", "config")), Symbol("SQLCONFIG"), Symbol("CONNECTION")];

let database = get("db");

module[SQLCONFIG] =  format({
  protocol: database.dialect + ":",
  slashes: true,
  host: `${database.host}:${database.port}`,
  port: database.port,
  pathname: database.name,
  path: database.name,
});

database = undefined;

function* connectionMongodb() {
  if (module[CONNECTION]) {
    return ;
  }
  if (!module[SQLCONFIG]) {
    throw new Error("can't find any connection configuration about mongodb! please check again");
  }
  module[CONNECTION] = yield MongoClient.connect(module[SQLCONFIG]);
}

function* getCollection(collectionName) {
  yield connectionMongodb();
  return module[CONNECTION].collection(collectionName);
}

function* query(collectionName, condition) {
  yield connectionMongodb();
  return module[CONNECTION].collection(collectionName).find(condition).toArray();
}

function* queryOne(collectionName, condition) {
  yield connectionMongodb();
  const rows = yield module[CONNECTION].collection(collectionName).find(condition).toArray();
  return rows && 0 !== rows.length ? rows[0] : null;
}

const closeConnection = () => {
  if (module[CONNECTION]) {
    module[CONNECTION].close();
    module[CONNECTION] = undefined;
  }
};

const buildModule = _path => require(_path)(module.exports);

const newObjectId = _id => _id.toHexString ? _id : new ObjectId(_id);

const valid = _id => {
  if ("string" === typeof _id && _id.length >= 24){
      return ObjectId.isValid(_id);
  } else if (_id instanceof ObjectId) {
      return true;
  }
  return false;
};

const definition = _obj => {
  const moduleDefine = {};
  const {classMethod, className} = _obj;

  Object.assign(moduleDefine, {
    moduleName: className,
    query,
    queryOne,
    closeConnection,
  });

  moduleDefine.moduleName = className;

  Object.keys(classMethod).map(method => {
    if (!classMethod[method].apply) {
      return;
    }
    moduleDefine[method] = function* (...args) {
      const col = yield* getCollection(className);
      Object.assign(col, {
        newObjectId,
        valid
      });
      return yield* classMethod[method].apply(col, args);
    };
  });

  return moduleDefine;
};

module.exports = {
  definition,
  import: buildModule,
};
