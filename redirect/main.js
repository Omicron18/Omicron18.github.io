
getInput();

function getInput(text) {
    const input = document.getElementById('input');
    const button = document.getElementById('button');
    input.addEventListener('change', entered);
    button.addEventListener('click', entered);
}

function entered() {
    var url=document.getElementById('input').value;
    if(!url.startsWith('https://')) {
        url='https://'+url;
    }

    if(url.startsWith('https://t.co/')) {
        fetch('https://t.co/FwSB1w4IZH', {cache:'no-cache'}).then(response => response.text() )
            .then(text => {
                const d = new DOMParser();
                next(d.parseFromString(text, "text/html").title);
            });
    } else {
        next(url);
    }
}

function next(input_url) {

    var replacement_string=window.location.href.split('?')[1];
    var replacements=replacement_string.split('&');
    var url=input_url;
    for (var rs of replacements) {
        var r=rs.split('=');
        url=url.replace(r[0],r[1]);
    }

    var s=document.createElement('a');
    s.textContent=url;
    s.href=url;
    document.body.appendChild(s);
    window.location.replace(url);
}

// https://omicron18.github.io/redirect?twitter.com=nitter.nixnet.services&youtu.be=piped.kavin.rocks
