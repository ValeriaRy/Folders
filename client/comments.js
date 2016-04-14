var commentModule = (function() {
    "use strict";
    
    var path="";
    sendComment.addEventListener("click", pressSend);
    
    function pressSend() {
        sendCommentToServer(userComment.value);
        commentModule.showComments();
    }
    
    function sendCommentToServer(comment) {
        if (comment) {
            var xhr = new XMLHttpRequest();
            var params = 'text=' + encodeURIComponent(comment)+"&path="+encodeURIComponent(path);
            var url = "https://node-tree-valeriary.c9users.io/recall?" + params;
            xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                information.innerHTML = xhr.responseText;
            } 
        };
            xhr.open("GET", url, true);
            xhr.send();
        }
    }
    
    function getComments() {
        if (path) {
            var xhr = new XMLHttpRequest();
            var params = 'path=' + encodeURIComponent(path);
            var url = "https://node-tree-valeriary.c9users.io/comm?" + params;
            xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                buildComments(JSON.parse(xhr.responseText));
            } 
        };
            xhr.open("GET", url, true);
            xhr.send();
        }
    }
    
    function buildComments(array) {
        treeModule.removeChildren(comments);
        for (var i = array.length - 1; i >= 0; i--) {
            var obj = array[i];
            var comm = document.createElement("div");
            var timeComm = document.createElement("span");
            timeComm.innerHTML = obj.time;
            comm.appendChild(timeComm);
            var textComm = document.createElement("span");
            textComm.innerHTML = obj.userComment;
            comm.appendChild(textComm);
            var blankLine = document.createElement("br");
            comm.appendChild(blankLine);
            comments.appendChild(comm);
        }
    }
    
    return {
        setPath: function(thisPath) {
            path = thisPath;
        },
        
        showComments: function() {
            var panel = document.getElementById("commentsPanel");
            if (parentFolder.innerHTML) {
                panel.setAttribute("class", "comments");
                userComment.value = "";
                getComments();
            } else {
                panel.setAttribute("class", "close_comments");
                userComment.value = "";
            }
        }

    };
}());
