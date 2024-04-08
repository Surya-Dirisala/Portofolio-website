document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('nav ul li a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener("click", clickHandler);
    }
    
    function clickHandler(e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;
    
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });

        // Close the navigation menu on small screens
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle.checked) {
            navToggle.checked = false;
        }
    }

    // Form validation
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // Submit the form
            this.submit();
        }
    });

    function validateForm() {
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            setErrorFor(nameInput, 'Name cannot be blank');
            isValid = false;
        } else {
            setSuccessFor(nameInput);
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            setErrorFor(emailInput, 'Email cannot be blank');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            setErrorFor(emailInput, 'Email is not valid');
            isValid = false;
        } else {
            setSuccessFor(emailInput);
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            setErrorFor(messageInput, 'Message cannot be blank');
            isValid = false;
        } else {
            setSuccessFor(messageInput);
        }

        return isValid;
    }

    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('small');

        errorMessage.innerText = message;
        formControl.className = 'form-control error';
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Responsive navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('change', function() {
        navMenu.classList.toggle('show');
    });
});
