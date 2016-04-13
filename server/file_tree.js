function folderView (currentFolder, result) {
    const fs = require('fs');
    var ROOT_FOLDER = "./node_modules";
    var arrayFolder = [];
    var path = "." + currentFolder;
    var entryPoint = path.substr(0, ROOT_FOLDER.length);

    if (entryPoint !== ROOT_FOLDER) {
        result ("Stop right there, criminal scum");
    } else {
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
}

exports.folderView = folderView;