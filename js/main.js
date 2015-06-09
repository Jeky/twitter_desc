var paramToJson = function(param){
    var paramPairs = param.split('&');
    var data = {};

    for(var i = 0; i < paramPairs.length; i++){
        var pair = paramPairs[i].split('=');
        data[pair[0]] = pair[1];
    }

    return data;
};

var showError = function(){
    $('#content').append('<h1>404 Not Found</h1>');
};

var init = function(){
    var url = window.location.href;
    url = url.replace('http://', '');
    var index = url.indexOf('/');
    url = url.substring(index + 1, url.length);

    if(url[0] === '?'){
        url = url.substring(1, url.length);
        var params = paramToJson(url);
        if(params.category && params.page){
            $('.nav li').eq(parseInt(params.category, 10)).addClass('active');
            $.get(params.page, function(html){
                $('#content').append(html);
            }).fail(showError);
        }else{
            showError();
        }
    }else{
        window.location.href = '/?category=0&page=home.html';
    }
};