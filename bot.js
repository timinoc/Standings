var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/standings$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : "https://www.youtube.com/watch?v=AgjlkE6BL1o \n\nBills - 7 - 0 \n\nPanthers - 7 - 0 \n\nCardinals - 6 - 0 \n\nJaguars - 6 - 0 \n\nPackers - 6 - 0 \n\nTitans - 6 - 1 \n\nCowboys - 5 - 1 \n\nVikings - 5 - 1 \n\nRaiders - 5 - 2 \n\nJets - 4 - 2 \n\nChiefs - 4 - 2 \n\nFalcons - 4 - 2 \n\nGiants - 4 - 3 \n\nSeahawks - 4 - 3 \n\nBengals - 4 - 3 \n\nColts - 4 - 3 \n\nBears - 3 - 3 \n\nSaints - 3 - 4 \n\nRams - 3 - 4 \n\nBroncos - 2 - 4 \n\nSteelers - 2 - 4 \n\nPatriots - 2 - 5 \n\nRedskins - 2 - 5 \n\nRavens - 2 - 5 \n\nTexans - 1 - 5 \n\nBuccaneers - 1 - 5 \n\nBrowns - 1 - 5 \n\n49ers - 1 - 6 \n\nEagles - 0 - 7 \n\nLions - 0 - 7 \n\nChargers - 0 - 6 \n\nDolphins - 0 - 6"
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
