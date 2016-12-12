
//read the json file
//create siri array

// console.log(siri);
var siri = require("./siri.json");
// var questions= require("./questions.json")
// console.log("lenght",siri.length);
// console.log("questions",questions[0].keywords);
var TEXT=siri[25].Answers;
console.log("Answers",TEXT);

var API_KEY='4c224f80dcce9e325b5bfa37a8dc7bc5a9e0632f'
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
    api_key: API_KEY
})

var parameters = {
  extract: 'entities,keywords',
  sentiment: 1,
  maxRetrieve: 1,
  emotion:1,
  text: TEXT
};

alchemy_language.combined(parameters, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});