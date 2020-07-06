// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Async = require("serbet/src/Async.bs.js");
var Decco = require("decco/src/Decco.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var Serbet = require("serbet/src/Serbet.bs.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Scheduler = require("./Scheduler.bs.js");
var MongoJs = require("./Mongo.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CustomSerbet = require("./lib/CustomSerbet.bs.js");

((require('isomorphic-fetch')));

function recipientData_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var recipient = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "recipient"), null));
  if (recipient.TAG) {
    var e = recipient._0;
    return {
            TAG: /* Error */1,
            _0: {
              path: ".recipient" + e.path,
              message: e.message,
              value: e.value
            }
          };
  }
  var addressTokenStream = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "addressTokenStream"), null));
  if (addressTokenStream.TAG) {
    var e$1 = addressTokenStream._0;
    return {
            TAG: /* Error */1,
            _0: {
              path: ".addressTokenStream" + e$1.path,
              message: e$1.message,
              value: e$1.value
            }
          };
  }
  var lengthOfPayment = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "lengthOfPayment"), null));
  if (lengthOfPayment.TAG) {
    var e$2 = lengthOfPayment._0;
    return {
            TAG: /* Error */1,
            _0: {
              path: ".lengthOfPayment" + e$2.path,
              message: e$2.message,
              value: e$2.value
            }
          };
  }
  var interval = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "interval"), null));
  if (interval.TAG) {
    var e$3 = interval._0;
    return {
            TAG: /* Error */1,
            _0: {
              path: ".interval" + e$3.path,
              message: e$3.message,
              value: e$3.value
            }
          };
  }
  var rate = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "rate"), null));
  if (rate.TAG) {
    var e$4 = rate._0;
    return {
            TAG: /* Error */1,
            _0: {
              path: ".rate" + e$4.path,
              message: e$4.message,
              value: e$4.value
            }
          };
  }
  var deposit = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "deposit"), null));
  if (!deposit.TAG) {
    return {
            TAG: /* Ok */0,
            _0: {
              recipient: recipient._0,
              addressTokenStream: addressTokenStream._0,
              lengthOfPayment: lengthOfPayment._0,
              interval: interval._0,
              rate: rate._0,
              deposit: deposit._0
            }
          };
  }
  var e$5 = deposit._0;
  return {
          TAG: /* Error */1,
          _0: {
            path: ".deposit" + e$5.path,
            message: e$5.message,
            value: e$5.value
          }
        };
}

function mongoResult_encode(v) {
  return Js_dict.fromArray([[
                "success",
                Decco.boolToJson(v.success)
              ]]);
}

var connectMongo = MongoJs.MongoConnect;

function recipientDbArray_encode(v) {
  return Decco.arrayToJson(Scheduler.recipientDbData_encode, v);
}

var getStreamss = MongoJs.getStreams;

var deleteStreams = MongoJs.deleteStream;

var testMongo = MongoJs.addStream;

function body_out_encode(v) {
  return Js_dict.fromArray([
              [
                "success",
                Decco.boolToJson(v.success)
              ],
              [
                "error",
                Decco.optionToJson(Decco.stringToJson, v.error)
              ]
            ]);
}

function createChannelRequest_encode(v) {
  return Js_dict.fromArray([
              [
                "partner_address",
                Decco.stringToJson(v.partner_address)
              ],
              [
                "token_address",
                Decco.stringToJson(v.token_address)
              ],
              [
                "total_deposit",
                Decco.stringToJson(v.total_deposit)
              ],
              [
                "settle_timeout",
                Decco.stringToJson(v.settle_timeout)
              ],
              [
                "reveal_timeout",
                Decco.stringToJson(v.reveal_timeout)
              ]
            ]);
}

function createStream(collection) {
  return Serbet.jsonEndpoint(undefined, {
              path: "/create-stream",
              verb: /* POST */1,
              body_in_decode: recipientData_decode,
              body_out_encode: body_out_encode,
              handler: (function (param, _req) {
                  var deposit = param.deposit;
                  var rate = param.rate;
                  var interval = param.interval;
                  var lengthOfPayment = param.lengthOfPayment;
                  var addressTokenStream = param.addressTokenStream;
                  var recipient = param.recipient;
                  console.log("recipient - " + (recipient + (", addressTokenStream - " + (addressTokenStream + (", lengthOfPayment - " + (String(lengthOfPayment) + (", interval - " + (String(interval) + (", rate" + (rate + (", deposit - " + deposit)))))))))));
                  return Async.let_(testMongo(collection, recipient, {
                                  recipient: recipient,
                                  addressTokenStream: addressTokenStream,
                                  lengthOfPayment: lengthOfPayment,
                                  interval: interval,
                                  rate: rate,
                                  deposit: deposit,
                                  numerOfPaymentsMade: 0,
                                  totalNumberOfPaymentsToMake: 100
                                }), (function (resultMongoDb) {
                                console.log("result from mongodb:", resultMongoDb);
                                return fetch("http://localhost:5001/api/v1/channels", Fetch.RequestInit.make(/* Put */3, {
                                                      "Content-Type": "application/json"
                                                    }, Caml_option.some(JSON.stringify(createChannelRequest_encode({
                                                                  partner_address: recipient,
                                                                  token_address: "0xb38981469B7235c42DDa836295bE8825Eb4A6389",
                                                                  total_deposit: "2",
                                                                  settle_timeout: "500",
                                                                  reveal_timeout: "50"
                                                                }))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(undefined)).then(function (prim) {
                                              return prim.json();
                                            }).then(function (json) {
                                            console.log("THE RESULT", json);
                                            return Promise.resolve({
                                                        success: true,
                                                        error: undefined
                                                      });
                                          });
                              }));
                })
            });
}

function createStreamTest(collection) {
  return Serbet.jsonEndpoint(undefined, {
              path: "/create-stream-test",
              verb: /* POST */1,
              body_in_decode: recipientData_decode,
              body_out_encode: mongoResult_encode,
              handler: (function (param, _req) {
                  var deposit = param.deposit;
                  var rate = param.rate;
                  var interval = param.interval;
                  var lengthOfPayment = param.lengthOfPayment;
                  var addressTokenStream = param.addressTokenStream;
                  var recipient = param.recipient;
                  console.log("recipient - " + (recipient + (", addressTokenStream - " + (addressTokenStream + (", lengthOfPayment - " + (String(lengthOfPayment) + (", interval - " + (String(interval) + (", rate" + (rate + (", deposit - " + deposit)))))))))));
                  return Async.let_(testMongo(collection, recipient, {
                                  recipient: recipient,
                                  addressTokenStream: addressTokenStream,
                                  lengthOfPayment: lengthOfPayment,
                                  interval: interval,
                                  rate: rate,
                                  deposit: deposit,
                                  numerOfPaymentsMade: 0,
                                  totalNumberOfPaymentsToMake: 100
                                }), Async.async);
                })
            });
}

function getStreamsEndpoint(collection) {
  return Serbet.endpoint(undefined, {
              path: "/get-streams",
              verb: /* GET */0,
              handler: (function (_req) {
                  return Async.let_(getStreamss(collection), (function (result) {
                                return Async.async({
                                            TAG: /* OkJson */4,
                                            _0: result
                                          });
                              }));
                })
            });
}

function body_in_del_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var id = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict._0, "id"), null));
  if (!id.TAG) {
    return {
            TAG: /* Ok */0,
            _0: {
              id: id._0
            }
          };
  }
  var e = id._0;
  return {
          TAG: /* Error */1,
          _0: {
            path: ".id" + e.path,
            message: e.message,
            value: e.value
          }
        };
}

function deleteStreamsEndpoint(collection) {
  return Serbet.jsonEndpoint(undefined, {
              path: "/delete-stream",
              verb: /* POST */1,
              body_in_decode: body_in_del_decode,
              body_out_encode: mongoResult_encode,
              handler: (function (param, _req) {
                  var id = param.id;
                  console.log(id);
                  return deleteStreams(collection, id);
                })
            });
}

var Endpoints = {
  body_out_encode: body_out_encode,
  createChannelRequest_encode: createChannelRequest_encode,
  createStream: createStream,
  createStreamTest: createStreamTest,
  getStreamsEndpoint: getStreamsEndpoint,
  body_in_del_decode: body_in_del_decode,
  deleteStreamsEndpoint: deleteStreamsEndpoint
};

connectMongo().then(function (mongoConnection) {
      console.log("connected");
      CustomSerbet.application(5000, {
            hd: createStream(mongoConnection),
            tl: {
              hd: createStreamTest(mongoConnection),
              tl: {
                hd: getStreamsEndpoint(mongoConnection),
                tl: {
                  hd: deleteStreamsEndpoint(mongoConnection),
                  tl: /* [] */0
                }
              }
            }
          });
      return Async.async(undefined);
    });

Scheduler.startProcess(undefined);

exports.recipientData_decode = recipientData_decode;
exports.mongoResult_encode = mongoResult_encode;
exports.connectMongo = connectMongo;
exports.recipientDbArray_encode = recipientDbArray_encode;
exports.getStreamss = getStreamss;
exports.deleteStreams = deleteStreams;
exports.testMongo = testMongo;
exports.Endpoints = Endpoints;
/*  Not a pure module */
