const url = require('url');
const path = require('path');
const fs = require('fs');
var ReadStream = require('./readStream');

exports.directoryRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var defaultPath = 'c:/';
    if (reqUrl.query.dir) {
        defaultPath = reqUrl.query.dir
    };
     
    const directoryPath = defaultPath;
     
    var readStream = new ReadStream(directoryPath);

    var file = {} // empty Object
    var filekey = 'Directory file info';
    file[filekey] = [];
    
    readStream
        .on('data', function (chunk) {            
            file[filekey].push(chunk);          
        })
        .on('error', function (err) {            
            console.log("filepath: '"+err.path+ "' has error code: " +err.code);
            
            var response = {
                "file_error": "filepath: '"+err.path+ "' has error code: " +err.code
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        })
        .on('end', function () {  // done

            var response = file[filekey];
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};
