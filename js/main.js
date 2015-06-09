var paramToJson = function(param){
    var paramPairs = param.split('&');
    var data = {};

    for(var i = 0; i < paramPairs.length; i++){
        var pair = paramPairs[i].split('=');
        data[pair[0]] = pair[1];
    }

    return data;
};

var showError = function(errCode){
    if(errCode === 404){
        $('#content').html('<h1>404 Not Found</h1>');
    }else if(errCode === 500){
        $('#content').html('<h1>500 Internal Server Error</h1>');
    }
};

var init = function(){
    try{
        var url = window.location.href;
        url = url.replace('http://', '');
        var index = url.indexOf('/');
        url = url.substring(index + 1, url.length);

        if(url[0] === '?'){
            url = url.substring(1, url.length);
            var params = paramToJson(url);
            if(params.category && params.page){
                $('.nav li').eq(parseInt(params.category, 10)).addClass('active');
                $.get(params.page, function(md){
                    var html = markdown.toHTML(md);
                    $('#content').append(html);
                    renderMathInElement(document.body, {
                        delimiters: [
                            {left: "$$", right: "$$", display: true},
                            {left: "\\[", right: "\\]", display: true},
                            {left: "$", right: "$", display: false},
                            {left: "\\(", right: "\\)", display: false}
                        ]
                    });
                }).fail(function(){
                    showError(404);
                });
            }else{
                showError(500);
            }
        }else{
            window.location.href = '/?category=0&page=home.html';
        }
    }catch(e){
        showError(500);
    }
};