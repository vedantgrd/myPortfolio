function WriteCookie() {
    const userValue = document.getElementById('contact-form').name.value; 
    if (userValue === "") {
        console.log("Enter some value!");
        return;
    }
    const cookieValue = escape(userValue) + ";";
    document.cookie = "name=" + cookieValue + "; path=/"; 
    console.log("Setting Cookies: name=" + cookieValue);
    showCookies(); 
}

function showCookies() {
    const allCookies = document.cookie;
    console.log("All Cookies: " + allCookies); 
}

function validateForm(event) {
    const form = document.getElementById('contact-form');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const errorMessage = document.getElementById("error-message");

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    errorMessage.textContent = ""; 

    if (!nameRegex.test(name)) {
        errorMessage.textContent = "Please enter a valid name (alphabets and spaces only).";
        return false;
    }

    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    alert("Thanks! I'll get in touch as soon as I can!");
    WriteCookie(); 
    form.reset(); 
    return true;
}

function handleRollover() {
    const buttons = document.getElementsByTagName('button');
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onmouseover = function() {
            this.style.backgroundColor = '#45a049'; 
        };
        
        buttons[i].onmouseout = function() {
            this.style.backgroundColor = ''; 
        };
    }
}

window.onload = function() {
    alert("Hello, Welcome to my Portfolio!");
    handleRollover(); 
};

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    validateForm(event); 
});

showCookies();
