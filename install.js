var fs = require('fs');
var selenium_atoms_path = './node_modules/selenium/build/javascript/selenium-atoms/selenium-atoms.js';
var exec = require('child_process').exec;
exec('cd node_modules && git clone git@github.com:SeleniumHQ/selenium.git --branch master --single-branch --depth 1 selenium && cd ../', function(err, stdout, stderr){
    if (err) {
        throw new Error(err);
    }
    exec('cd node_modules/selenium && ./go ide_proxy_setup && cd ../../', function(err, stdout, stderr){
        if (err) {
            throw new Error(err);
        }
        var data = fs.readFileSync(selenium_atoms_path);
        data = "var goog = {};Object.defineProperty(goog, 'global', { 'get' : function () { return global }, 'set' : function () {} });\n" + data;
        fs.writeFileSync(selenium_atoms_path, data);
    });
});
exec('cd node_modules && wget "https://raw.githubusercontent.com/facebook/flow/gh-pages/downloads/flow-osx-latest.zip" -O flow-osx-latest.zip && unzip flow-osx-latest.zip && rm -fr flow-osx-latest.zip && cd ../', function(err, stdout, stderr){
    if (err) {
        throw new Error(err);
    }
    exec('cd node_modules/.bin && ln -s ../flow/flow flow && cd ../../', function(err, stdout, stderr){
        if (err) {
            throw new Error(err);
        }
    });
});
