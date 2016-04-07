function folderView (currentFolder, result) {
    const fs = require('fs');
    var arrayFolder = [];
    var path = "." + currentFolder;

    fs.readdir(path, function(err, items) {
        if (items === undefined) {
            result("This is not a folder");
        } else {
            for (var i = 0; i < items.length; i++) {
                arrayFolder.push(items[i]);
            }
            result(arrayFolder);
        }
    }); 
}

exports.folderView = folderView;