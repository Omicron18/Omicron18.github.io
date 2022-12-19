
getInput();

function getInput(text) {
    const input = document.getElementById('input');
    const button = document.getElementById('button');
    input.addEventListener('change', entered);
    button.addEventListener('click', entered);
}

function entered() {
    var input_url=document.getElementById('input').value;

    var url=input_url.replace('twitter.com','nitter.nixnet.services');
    var s=document.createElement('p');
    s.textContent=url;
    s.href=url;
    document.body.appendChild(s);
    window.location.replace(url);
}
