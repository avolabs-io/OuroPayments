// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Decco = require("decco/src/Decco.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var BsCron = require("bs-cron/src/BsCron.bs.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");

function recipientDbData_encode(v) {
  return Js_dict.fromArray([
              [
                "recipient",
                Decco.stringToJson(v.recipient)
              ],
              [
                "addressTokenStream",
                Decco.stringToJson(v.addressTokenStream)
              ],
              [
                "lengthOfPayment",
                Decco.intToJson(v.lengthOfPayment)
              ],
              [
                "interval",
                Decco.intToJson(v.interval)
              ],
              [
                "rate",
                Decco.stringToJson(v.rate)
              ],
              [
                "deposit",
                Decco.stringToJson(v.deposit)
              ],
              [
                "numerOfPaymentsMade",
                Decco.intToJson(v.numerOfPaymentsMade)
              ],
              [
                "totalNumberOfPaymentsToMake",
                Decco.intToJson(v.totalNumberOfPaymentsToMake)
              ]
            ]);
}

function makePaymentRequest_encode(v) {
  return Js_dict.fromArray([
              [
                "amount",
                Decco.stringToJson(v.amount)
              ],
              [
                "identifier",
                Decco.stringToJson(v.identifier)
              ]
            ]);
}

var dummyData = [
  {
    recipient: "0x4AA554636eBAf8C2d42dE1b20DaB91441b8d2eCF",
    addressTokenStream: "0xb38981469B7235c42DDa836295bE8825Eb4A6389",
    lengthOfPayment: 86400,
    interval: 60,
    rate: "5",
    deposit: "7200",
    numerOfPaymentsMade: 0,
    totalNumberOfPaymentsToMake: 1440
  },
  {
    recipient: "0x365D295f7FFc5aae082FD29FD0F6769ba15FDf39",
    addressTokenStream: "0xb38981469B7235c42DDa836295bE8825Eb4A6389",
    lengthOfPayment: 86400,
    interval: 60,
    rate: "10",
    deposit: "14400",
    numerOfPaymentsMade: 0,
    totalNumberOfPaymentsToMake: 1440
  }
];

function makePayment(recipientAddress, amount) {
  var requestString = "http://localhost:5001/api/v1/payments/0xb38981469B7235c42DDa836295bE8825Eb4A6389/" + recipientAddress;
  console.log(amount);
  return fetch(requestString, Fetch.RequestInit.make(/* Post */2, {
                        "Content-Type": "application/json"
                      }, Caml_option.some(JSON.stringify(makePaymentRequest_encode({
                                    amount: amount,
                                    identifier: "optional identifier blah blah"
                                  }))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(undefined)).then(function (prim) {
                return prim.json();
              }).then(function (json) {
              return Promise.resolve((console.log("THE RESULT:", json), undefined));
            });
}

var class_tables = /* Cons */{
  key: undefined,
  data: undefined,
  next: undefined
};

var class_tables$1 = /* Cons */{
  key: undefined,
  data: undefined,
  next: undefined
};

function paymentHandler(item) {
  if (item.numerOfPaymentsMade === item.totalNumberOfPaymentsToMake) {
    if (!class_tables$1.key) {
      var $$class = CamlinternalOO.create_table(0);
      var env = CamlinternalOO.new_variable($$class, "");
      var env_init = function (env$1) {
        var self = CamlinternalOO.create_object_opt(undefined, $$class);
        self[env] = env$1;
        return self;
      };
      CamlinternalOO.init_class($$class);
      class_tables$1.key = env_init;
    }
    return Curry._1(class_tables$1.key, undefined);
  }
  makePayment(item.recipient, item.rate);
  if (!class_tables.key) {
    var $$class$1 = CamlinternalOO.create_table(0);
    var env$1 = CamlinternalOO.new_variable($$class$1, "");
    var env_init$1 = function (env$2) {
      var self = CamlinternalOO.create_object_opt(undefined, $$class$1);
      self[env$1] = env$2;
      return self;
    };
    CamlinternalOO.init_class($$class$1);
    class_tables.key = env_init$1;
  }
  return Curry._1(class_tables.key, undefined);
}

var job = BsCron.CronJob.make({
      HASH: /* CronString */870007071,
      VAL: "* * * * *"
    }, (function (param) {
        console.log("Printing every minute");
        Belt_Array.map(dummyData, paymentHandler);
        
      }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

function startProcess(param) {
  job.start();
  
}

exports.recipientDbData_encode = recipientDbData_encode;
exports.makePaymentRequest_encode = makePaymentRequest_encode;
exports.dummyData = dummyData;
exports.makePayment = makePayment;
exports.paymentHandler = paymentHandler;
exports.job = job;
exports.startProcess = startProcess;
/* job Not a pure module */
