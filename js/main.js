document.addEventListener('DOMContentLoaded', () => {
    // Handle signup form
    document.getElementById("signup-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const responseMessage = document.getElementById("response-message");
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            responseMessage.style.display = 'none';
            
            const response = await fetch("https://formspree.io/f/mblgrjke", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                responseMessage.textContent = "Thanks for subscribing!";
                responseMessage.className = 'signup-message success';
                form.reset();
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            responseMessage.textContent = "Something went wrong. Please try again.";
            responseMessage.className = 'signup-message error';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            responseMessage.style.display = 'block';
            
            setTimeout(() => {
                responseMessage.style.display = 'none';
            }, 5000);
        }
    });
});
