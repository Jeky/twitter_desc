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
                $.get(params.page, function(content){
                    var html = content;
                    if(params.page.lastIndexOf('.md') == params.page.length - 3){
                        html = marked(content)
                                .replace(/\[\s\]/g, '<input type="checkbox" class="task-item">')
                                .replace(/\[x\]/g, '<input type="checkbox" checked="checked" class="task-item">');
                    }
                    $('#content').html(html);
                    $('table').each(function(){
                        $(this).addClass('table table-hover table-bordered');
                    });

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
            window.location.href = '/?category=0&page=home.md';
        }
    }catch(e){
        showError(500);
    }
};