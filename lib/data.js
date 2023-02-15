const fs = require('fs');
const path = require('path');

const lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');
lib.create = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {

        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err1) => {
                if(!err1){
                    fs.close(fileDescriptor, (err2) => {
                        if(!err2){
                            callback(false);
                        }else{
                            callback('Error closing new file');
                        }
                    })
                }else{
                    callback('Error writing to new file');
                }
            })
        }else{
            callback('Could not create new file, it may already exist');
        }

    })
};
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (err, data) => {
        callback(err, data);
    });
};
lib.update = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
        fs.ftruncate(fileDescriptor, (err1) => {
            if(!err1 ){
                const stringData = JSON.stringify(data);
                fs.writeFile(fileDescriptor, stringData, (err2) => {
                    if(!err2){
                        fs.close(fileDescriptor, (err3) => {
                            if(!err3){
                                callback(false);
                            }else{
                                callback('Error closing existing file');
                            }
                        })
                    }else{
                        callback('Error writing to existing file');
                    }
                })
            }else{
                callback('Error truncating file');
            }
        });
    });
};
lib.delete = (dir, file, callback) => {
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
        if(!err){
            callback(false);
        }else{
            callback('Error deleting file');
        }
    });
};

module.exports = lib;