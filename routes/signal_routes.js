var _ = require('lodash');
var moment = require('moment');



module.exports = function(app, express, router, auth, firebase, notifier){

    router.get('/signals', function(req, res) {
      res.json({ message: 'signals api' });
    });

    router.post('/signals', auth, function(req, res) {
      
      //console.log(req.body.arr[0]); //array
      console.log(req.body);
      
      var id = req.body.id;
      var sig = req.body.signal;
      var currency = req.body.currency;
      var description = req.body.description;
      var stoploss = req.body.stoploss;
      var takeprofit = req.body.takeprofit;
      var timestamp = moment().valueOf();
      var id = req.body.id;

      var signal = {
                      id: id,
                      signal: sig,
                      currency: currency,
                      description: description,
                      stoploss: stoploss,
                      takeprofit: takeprofit,
                      timestamp: timestamp
                    };

      /*var signal = {};
      signal[id] = {    
                      signal: sig,
                      currency: currency,
                      description: description,
                      stoploss: stoploss,
                      takeprofit: takeprofit,
                      timestamp: timestamp
                   };*/

      //notifier.send(signal);

      var db = firebase.database();
      var ref = db.ref("signals");
      //ref.set(signal);
      ref.push().set(signal);
      //res.json(signal);
    });

    router.get('/beats', function(req, res) {
        
        res.json({ message: 'beats api' });
        
    });   
}