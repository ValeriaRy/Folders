"use strict";

(function() {
    var path = "";
    var ROOT_FOLDER = "node_modules";

    function goToFolder(folder) {
        path = path + "/" + folder;
        var xhr = new XMLHttpRequest();
        var params = 'name=' + encodeURIComponent(path);
        var url = "https://node-tree-valeriary.c9users.io/hello?" + params;
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                determineItem(folder, xhr.responseText);
            } 
        };
        xhr.open("GET", url, true);
        xhr.send();
    }
    
    list.addEventListener("click", function() { 
        getInformation(event);
    }, false);
    
    function getInformation(e) {
        goToFolder(e.target.innerHTML);
    }
    
    function determineItem(folder, response) {
        if (response === "This is not a folder") {
            information.innerHTML = response;
            var str = path.replace(new RegExp("/" + folder), "");
            path = str;
        } else {
            information.innerHTML = "";
            openFolder(folder, response);
        }
    }
    
    function openFolder(thisParent, folder) {
        var array;
        removeChildren(list);
        if (typeof(folder) === "string") {
            array = JSON.parse(folder);
        } else {
            array = folder;
        }
        buildListFolder(array);
        parentFolder.innerHTML = thisParent;
    }
    
    function buildListFolder (arr) {
        for (var i = 0; i < arr.length; i++) {
            var listItem = document.createElement("li");
            listItem.innerHTML = arr[i];
            list.appendChild(listItem);
        }
    }
    
    function removeChildren(node) {
        var children = node.childNodes;
        while(children.length) {
            node.removeChild(children[0]);
        }
    }
    
    returnButton.addEventListener("click", function() {
        if (((list.firstChild !== ROOT_FOLDER) && (list.childNodes.length !== 2))
        && (path !== "")){
            var positionFolder = path.lastIndexOf("/" + parentFolder.innerHTML);
            var str = path.substring(0, positionFolder);
            var positionSymbol = str.lastIndexOf("\/");
            path = str.substring(0, positionSymbol);
            goToFolder(str.substring(positionSymbol + 1));
        } else {
            openFolder("", [ROOT_FOLDER]);
            path = "";
        } 
    });
    
})();
