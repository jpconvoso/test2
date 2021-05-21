const bodyParser = require('body-parser');
const express = require('express');
const child_process = require('child_process');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.get('/',(req,res) =>{
    //res.send('Hello World');
    //let parentProcess = child_process.exec('node',['data.json',0]);
    for(var i=0; i<3; i++) {
        var parentProcess = child_process.exec('node parent.js '+i,function 
           (error, stdout, stderr) {
           
           if (error) {
              console.log(error.stack);
              console.log('Error code: '+error.code);
              console.log('Signalreceived: '+error.signal);
           }
           console.log('stdout: ' + stdout);
           console.log('stderr: ' + stderr);
           for(let j = 0; j<3; i++) {
            let workerProcess = child_process.spawn('node', ['child.js', j]);
         
            workerProcess.stdout.on('data', function (data) {
               console.log('stdout: ' + data);
            });
         
            workerProcess.stderr.on('data', function (data) {
               console.log('stderr: ' + data);
            });
         
            workerProcess.on('close', function (code) {
               console.log('child process exited with code ' + code);
            });
         }
        });
     
        parentProcess.on('exit', function (code) {
           console.log('Parent process exited with exit code ' + code);
        });
     }

});

app.post('/',(req,res) =>{

    
    

});
const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`App is running on port 3000`);
});