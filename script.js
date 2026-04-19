const API_ENDPOINT = 'https://icanhazdadjoke.com/';
const XHR = new XMLHttpRequest();

function  getJoke() {
    XHR.open('GET', API_ENDPOINT);

    XHR.setRequestHeader('Accept', 'application/json');
    XHR.responseType = 'json';

    XHR.onload = function() {
        showJoke(XHR.response.joke);
        setButtonCta(false);
    }
    
    XHR.onerror = function() {
        showError("An error occurec, please try again");
        setButtonCta(false);
    }

    XHR.send();

}