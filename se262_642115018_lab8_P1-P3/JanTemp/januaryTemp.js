// Include the nodejs File system into your program

var fs = require('fs');

var january = "48,42,68\n";
january += "48,42,69\n";
january += "49,42,69\n";
january += "49,42,61\n";
january += "49,42,65\n";
january += "49,42,62\n";
january += "49,42,62\n";

fs.writeFile('sfjanaverages.txt', january, function (err) {
    if (err) console.log(err);
    console.log('Created successfully');
});

fs.readFile('sfjanaverages.txt', function (err, data) {
    if (err) throw err;
    console.log(String (data));
});