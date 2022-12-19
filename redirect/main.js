
getInput();

function getInput(text) {
    const input = document.getElementById('input');
    input.addEventListener('change', entered);
    return '';
}

function entered() {
    var input_url=document.getElementById('input').value;

    var url=input_url.replace('twitter.com','nitter.nixnet.services');
    window.location.replace(url);
}
