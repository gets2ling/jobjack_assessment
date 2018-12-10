var util = require('util');
var fs = require('fs');
var path = require('path');
var stream = require('stream');
const EventEmitter = require('events');


function FileStat (pathFull) {
    stream.Stream.apply(this);
    this.readable = true;
    this.writable = false;

    var self = this;

    fs.stat(pathFull, function(err, stats) {

    if (err) {
        return self.emit('error', err);
        self.emit('end');
    }

    else if (stats.isFile){
        var response = {
            "filename": String(path.basename(String(pathFull))),
            "path": String(pathFull),
            "size": String(stats.size)
        };
        for (var i in stats) {
            if ('function' !== typeof stats[i])
            response[i] = stats[i];
            }
        self.emit('data', response);
        self.emit('end');
    }
    });
}
util.inherits(FileStat, stream.Stream);

function ReadStream (directory) {
        
    stream.Stream.apply(this);
    this.readable = true;
    this.writable = false;

    var self = this;
    
    fs.readdir(directory, function(err, files) {
 
        
        if(err) return self.emit('error', err);
        files.sort();
        var filelen = files.length;

        files.forEach(function(e) {

             const fileStat = new FileStat(path.resolve(directory, e));

             fileStat.on('data', function (chunk) {  
                self.emit('data', chunk);          
            });
            
             fileStat.on('error', function (err) {  
                console.log("filepath: '"+err.path+ "' has error code: " +err.code);          
            });

            fileStat.on('end', () => {filelen -= 1;
                if(filelen == 0){
                    self.emit('end');
                }
            });       
        })       
    })
}
util.inherits(ReadStream, stream.Stream);

module.exports = ReadStream;




