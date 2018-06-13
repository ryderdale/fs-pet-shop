'use strict';

let fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
// const querystring = require('querystring');

let express = require('express');
let app = express();
let port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/pets', function(req, res) {
  // let requestArray = req.url.split('', 2);
  // let requestObjectTarget = requestArray[0];
  // let requestParams = requestArray[1]; 
  // let requestObject = querystring.parse(requestParams);
  // res.end(JSON.stringify(querystring.parse(req.url)));
    fs.readFile(petsPath, 'utf8', function(err, petsData) {
      if (err) {
        console.error(err.stack);
        //need to check to see what .stack is
        return res.sendStatus(500);
      }
      let pets = JSON.parse(petsData);
      res.send(pets);
      });
  });

  app.get('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsData){
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
  
      var id = Number.parseInt(req.params.id);
      var pets = JSON.parse(petsData);
  
      if (id < 0 || id >= pets.length || Number.isNaN(id)) {
        return res.sendStatus(404);
      }
  
      res.set('Content-Type', 'application/json');
      res.send(pets[id]);
    });
  });

  // app.post('/pets/:id', function(req, res) {
  //   fs.readFile(petsPath, 'utf8', function(err, petsData){
  //     if (err) {
  //       console.error(err.stack);
  //       return res.sendStatus(500);
  //     }
  
  //     var id = Number.parseInt(req.params.id);
  //     var pets = JSON.parse(petsData);
  
  //     if (id < 0 || id >= pets.length || Number.isNaN(id)) {
  //       return res.sendStatus(404);
  //     }
  
  //     res.set('Content-Type', 'application/json');
  //     res.send(pets[id]);
  //   });
  // });

  
  
  app.use(function(req, res) {
    res.sendStatus(404);
  });

  app.listen(port, function() {
    console.log('Listening on port', port);
  });
 
  module.exports = app;


      // else {
      //   if (req.method === 'GET' && requestObjectTarget === '/pets' && requestParams === undefined) {
      //     res.setHeader('Content-Type', 'application/json');
      //     res.end(petsData);
      //   }
      //   else if (req.method === 'GET' && req.url === '/pets' && typeof parseInt(requestParams) === 'number') {
      //     let index = parseInt(requestParams)
      //     let pets = JSON.parse(petsData);
      //     if(pets[index]) {
      //       let petsJSON = JSON.stringify(pets[index]);
      //       res.setHeader('Content-Type', 'application/json');
      //       res.end(petsJSON);
      //     }
      //     else {
      //       res.statusCode = 404;
      //       res.setHeader('Content-Type', 'text/plain');
      //       res.end('Not Found');
      //     }
      //   }
      //   else if(req.method === 'POST' && requestObjectTarget === '/pets') {
      //     //request must contain age, kind, name
      //       if (requestObject.hasOwnProperty('age')) {
      //         if(requestObject.hasOwnProperty('kind')) {
      //           if(requestObject.hasOwnProperty('name')) {
      //             let pets = JSON.parse(petsData);
      //             pets.push(requestObject);
      //             let petsJSON = JSON.stringify(pets);
      //             res.end(petsJSON);
      //           }
      //           else {
      //             res.statusCode = 400
      //             res.end('Bad request. Must specificy name. E.g. http POST localhost:8000/pets?age=SPECIFY_AGE&kind=SPECIFY_KIND&name=SPECIFY_NAME');
      //           }
      //         }
      //         else {
      //           res.statusCode = 400
      //           res.end('Bad request. Must specificy kind. E.g. http POST localhost:8000/pets?age=SPECIFY_AGE&kind=SPECIFY_KIND&name=SPECIFY_NAME');
      //         }
      //       }
      //       else {
      //         res.statusCode = 400
      //         res.end('Bad request. Must specificy age. E.g. http POST localhost:8000/pets?age=SPECIFY_AGE&kind=SPECIFY_KIND&name=SPECIFY_NAME');
      //       }
      //   }
  //       else {
  //         res.statusCode = 404;
  //         res.setHeader('Content-Type', 'text/plain');
  //         res.end('Not Found');
  //       }
  //     }
  //   })
  // }


//when server is run by nodemon, console log the confirmation and keep it running

//enable nodemon to run the server within the directory by calling "server"
