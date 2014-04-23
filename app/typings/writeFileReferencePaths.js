var resultFileName = 'reference.d.ts';
var fs = require('fs');
fs.readdir('.', function (err, files) {
    var fileList = files.filter(function(file) { 
        return (file.match(/\.d\.ts$/) && file !== resultFileName);
    });
    var refStr = '/// <reference path="' + fileList.join('"/>\n/// <reference path="') + '"/>\n';
    fs.writeFileSync(resultFileName, refStr, "utf8");
});