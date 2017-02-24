/**
  * afterloe - cynomy_portal_server/tools/lib/websocket.js
  *
  * Copyright(c) afterloe.
  * MIT Licensed
  *
  * Authors:
  *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
  * Date:
  *   2017-2-7 13:53:30
  */
"use strict";

const [siteConfig, registerList, WEBSOCKET] = [new Map(), new Map(), Symbol("WEBSOCKET")];

let websocket = null;

siteConfig.set("protocol", "node-protocol");

const setLinkInfo = (host, port) => {
  siteConfig.set("host", host);
  siteConfig.set("port", port);
  $("#control-small-info").html(`linked Node ${host}: ${port} <button type="button" class="btn btn-outline-danger btn-sm" onClick="javascript:disconnectionWS();">断开连接</button>`);
};

const disconnectionWS = () => {
  if (websocket) {
    websocket.close();
  }
};

const tryToLink = () => {
  websocket = new WebSocket(`ws://${siteConfig.get("host")}:${siteConfig.get("port")}`, siteConfig.get("protocol"));

  websocket.addEventListener("open", () => $("#console").html(`<div class="alert alert-success" role="alert">
  <strong>成功!</strong> 链接节点成功.
  </div>`));

  websocket.addEventListener("message", evt => {
      const {data} = evt;
      const {info, type, _} = JSON.parse(data);
      $("#console").html(info);
      const callback = registerList.get(type);
      if (callback && callback.call) {
          callback(null, _);
      }
  });

  websocket.addEventListener("close", (evt) => {
    console.log(evt);
    $("#control-small-info").html(`未连接节点 <button type="button" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#linkNode">链接节点</button>`);
    $("#linkNode").modal("show");
    $("#console").html(`<div class="alert alert-danger" role="alert">
    <strong>出错了!</strong> 节点链接失败.
  </div>`);
  });
};

// 扩展webSocket 的 ArrayBuffer的 扩展ArrayBuffer的方法
if (!ArrayBuffer.transfer) {
    ArrayBuffer.transfer = function(source, length) {
        source = Object(source);
        var dest = new ArrayBuffer(length);
        if (!(source instanceof ArrayBuffer) || !(dest instanceof ArrayBuffer)) {
            throw new TypeError('Source and destination must be ArrayBuffer instances');
        }
        if (dest.byteLength >= source.byteLength) {
            var nextOffset = 0;
            var leftBytes = source.byteLength;
            var wordSizes = [8, 4, 2, 1];
            wordSizes.forEach(function(_wordSize_) {
                if (leftBytes >= _wordSize_) {
                    var done = transferWith(_wordSize_, source, dest, nextOffset, leftBytes);
                    nextOffset = done.nextOffset;
                    leftBytes = done.leftBytes;
                }
            });
        }
        return dest;
        function transferWith(wordSize, source, dest, nextOffset, leftBytes) {
            var ViewClass = Uint8Array;
            switch (wordSize) {
                case 8:
                    ViewClass = Float64Array;
                    break;
                case 4:
                    ViewClass = Float32Array;
                    break;
                case 2:
                    ViewClass = Uint16Array;
                    break;
                case 1:
                    ViewClass = Uint8Array;
                    break;
                default:
                    ViewClass = Uint8Array;
                    break;
            }
            var view_source = new ViewClass(source, nextOffset, Math.trunc(leftBytes / wordSize));
            var view_dest = new ViewClass(dest, nextOffset, Math.trunc(leftBytes / wordSize));
            for (var i = 0; i < view_dest.length; i++) {
                view_dest[i] = view_source[i];
            }
            return {
                nextOffset : view_source.byteOffset + view_source.byteLength,
                leftBytes : source.byteLength - (view_source.byteOffset + view_source.byteLength)
            };
        }
    };
}

const registry = (type, callback) => {
    if (registerList.has(type)) {
        throw new Error("this type is ready in this list");
    } else {
        registerList.set(type, callback);
    }
};

const getFormData = form => {
    const data = {};
    form.serializeArray().map(item => {
        if (data[item.name]) {
            if (data[item.name]instanceof Array) {
                data[item.name].push(item.value);
            } else {
                const _ = [];
                _.push(data[item.name]);
                _.push(item.value);
                data[item.name] = _;
            }
        } else {
            data[item.name] = item.value;
        }
    });
    return data;
};
