const fs = require('fs');

const helpers = {
    deleteFile: function(name, path) {
        fs.unlinkSync(path+"/"+name);
    }
}

module.exports = helpers;