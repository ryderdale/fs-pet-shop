// let fs = require('fs'); 



// fs.readFile('pets.json', 'utf8', function (err, data) {
//     if(err) {
//         throw err;
//     }
//     console.log(data);



// });


'use strict';
// provides an API for interacting with file system
let fs = require('fs');

//return the whole object when the file is run
// fs.readFile('pets.json', 'utf8', function (err, data) {
//     if(err) {
//         throw err;
//     }
//     console.log(data);
// });


// path module handles and transforms file modules
let path = require('path');


let petsPath = path.join(__dirname, 'pets.json');
// let pets = JSON.parse('pets.json');

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];

let commands = ["create", "read", "update", "destroy"];

if (commands.indexOf(cmd) == -1) {
    console.error("Usage: node pets.js [read | create | update | destroy]")
    process.exit(1);
}
else {
    if (cmd === 'read') {
        fs.readFile(petsPath, 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          let pets = JSON.parse(data);
          let index = process.argv[3];
        //   console.log("Index is", index);
          if (index == undefined) {
              console.log(pets);
          } else {
              if (pets[parseInt(index)]) {
                console.log(pets[parseInt(index)])
              } else {
                console.error("Usage: node pets.js read INDEX");
                process.exit(1);
              }
            
          }
        });
      }
      if (cmd === 'create') {
        fs.readFile ('pets.json', 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          let pets = JSON.parse(data);
          let age = process.argv[3];
          let kind = process.argv[4];
          let name = process.argv[5];
          if(typeof parseInt(age) == 'number') {
            if (kind) {
                if(name) {
                    let pet = {age:parseInt(age), kind:kind , name:name};
                    pets.push(pet);
                    let petsJSON = JSON.stringify(pets);
                    fs.writeFile(petsPath, petsJSON, function(writeErr) {
                        if (writeErr) {
                        throw writeErr;
                        }
                        console.log(pets);
                    });
                    
                }
                else {
                    console.error("Usage: node pets.js create AGE KIND NAME")
                    process.exit(1);
                }
            }
            else {
                console.error("Usage: node pets.js create AGE KIND NAME")
                process.exit(1);
            }
        }
        else {
            console.error("Usage: node pets.js create AGE KIND NAME")
            process.exit(1);
        }
        });
      }
      if (cmd === 'update') {
        fs.readFile ('pets.json', 'utf8', function(err, data) {
          if (err) {
            throw err;
          }
          let pets = JSON.parse(data);
          let index = process.argv[3];
          let age = process.argv[4];
          let kind = process.argv[5];
          let name = process.argv[6];
          if (typeof parseInt(index) == 'number' && pets[parseInt(index)]){
            if(typeof parseInt(age) == 'number') {
                if (kind) {
                    if(name) {
                        pets[index].age = parseInt(age);
                        pets[index].kind = kind;
                        pets[index].name = name;
                        let petsJSON = JSON.stringify(pets);
                        fs.writeFile(petsPath, petsJSON, function(writeErr) {
                        if (writeErr) {
                        throw writeErr;
                        }
                        console.log(pets);
                    });
                    }
                    else {
                        console.error("Usage: node pets.js update INDEX AGE KIND NAME")
                        process.exit(1);
                    }
                }
                else {
                    console.error("Usage: node pets.js update INDEX AGE KIND NAME")
                    process.exit(1);
                }
            }
            else {
                console.error("Usage: node pets.js update INDEX AGE KIND NAME")
                process.exit(1);
            }
          }
          else {
              console.error("Usage: node pets.js update INDEX AGE KIND NAME")
              process.exit(1);
          }
            
        });
      }
      if (cmd === 'destroy') {
        fs.readFile ('pets.json', 'utf8', function(err, data) {
            let pets = JSON.parse(data);
            let index = process.argv[3];
          if (err) {
            throw err;
          }
          if (typeof parseInt(index) == 'number' && pets[parseInt(index)]){
                pets.splice(index,1);
                let petsJSON = JSON.stringify(pets);
                fs.writeFile(petsPath, petsJSON, function(writeErr) {
                if (writeErr) {
                    throw writeErr;
                }
                console.log(pets);
                });
            }
          else {
              console.error("Usage: node pets.js destroy INDEX")
              process.exit(1);
          };

          });
        }
    };





//   else {
//       console.error(node + file + "[read | create | update | destroy]")
//     console.error(`Usage: ${node} ${file} read`);
//     process.exit(1);
//   }




// else {
//   console.error(`Usage: ${node} ${file} read`);
//   process.exit(1);
// }

