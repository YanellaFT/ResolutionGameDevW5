document.addEventListener('DOMContentLoaded', () => {

    const head = document.querySelector('.head');
    const text = head.textContent;
    head.innerHTML = ''; 

    [...text].forEach((char, i) => {
        const span = document.createElement('span');

        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        span.style.display = 'inline-block';

        span.style.animationDelay = `${i * 0.1}s`; 
        head.appendChild(span);
    });
    // did use AI to write the above ^^^ bc couldn't figure it out for the life of me :(
    

    const selectorBtn = document.getElementById('button');
    const ctaBtn = document.getElementById('cta');
    const loader = document.getElementById('loader');
    const joke = document.getElementById('joke');
    const errorCont = document.getElementById('errorContainer');
    const error = document.getElementById('errorMessage');

    const API_ENDPOINT = 'https://icanhazdadjoke.com/';
    

    let fullJoke = "";
    let punchline = "";
    let isPunchlinePending = false;

    function setDisabledUiState(isDisabled) {
        setLoaderState(isDisabled);
        setButtonState(isDisabled);
    }



    function processJoke(jokeText) {
        setDisabledUiState(false);
        errorCont.style.display = 'none';
        
        fullJoke = jokeText;

        const splitIndex = jokeText.search(/[?!.]/);

        if (splitIndex !== -1) {
            joke.innerHTML = jokeText.substring(0, splitIndex + 1);
            punchline = jokeText.substring(splitIndex + 1).trim();
            isPunchlinePending = true;
            ctaBtn.innerHTML = "Show Answer";
        }else {
            joke.innerHTML = "I have a good one...";
            punchline = jokeText;
            isPunchlinePending = true;
            ctaBtn.innerHTML = "What is it?";
        }
    }



    function showAnswer() {
        joke.innerHTML += `<br><br><strong>${punchline}</strong>`;
        ctaBtn.innerHTML = "Get another one";
        isPunchlinePending = false;
    }

    function showError(error) {
        setDisabledUiState(false);
        isPunchlinePending = false;
        joke.innerHTML = ''; 
        error.innerHTML = error;
        errorCont.style.display = 'block';
        ctaBtn.innerHTML = "Try again";
    }



    function setLoaderState(isVisible) {
        loader.style.display = isVisible ? 'block' : 'none';
    }

    function setButtonState(isDisabled) {
        if (isDisabled) {
            selectorBtn.setAttribute('disabled', 'disabled');
        } else {
            selectorBtn.removeAttribute('disabled');
        }
        ctaBtn.style.display = isDisabled ? 'none' : 'block';
    }


    function getJoke() {
        const XHR = new XMLHttpRequest();
        XHR.open('GET', API_ENDPOINT);
        XHR.setRequestHeader('Accept', 'application/json');
        XHR.responseType = 'json';

        XHR.onload = function() {
            if (XHR.status === 200) {
                processJoke(XHR.response.joke);
            } else {
                showError('Server error: ' + XHR.status);
            }
        };

        XHR.onerror = function() {
            showError('Connection error.');
        };

        XHR.send();
    }



    if (selectorBtn) {
        selectorBtn.addEventListener('click', function() {
            if (isPunchlinePending) {
                showAnswer();
            } else {
                setDisabledUiState(true);
                getJoke();
            }
        });
    }

});


