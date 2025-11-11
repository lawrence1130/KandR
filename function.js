// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- Gallery Modal Functionality ---
    
    // Get all the necessary elements
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-button');
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    // Loop through all gallery images and add a click event listener
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block'; // Show the modal
            modalImg.src = this.src;       // Set the modal image src to the clicked image's src
        });
    });

    // Add click event to the close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none'; // Hide the modal
    });

    // Add click event to the modal background (outside the image)
    modal.addEventListener('click', function(event) {
        // If the clicked target is the modal itself (the background), close it
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });


    // --- Smooth Scrolling for Navigation Links ---

    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default anchor "jump" behavior
            e.preventDefault(); 
            
            // Get the target element's ID from the href attribute
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Get the position of the navigation bar
            const navHeight = document.querySelector('nav').offsetHeight;

            // Calculate the target position, subtracting the nav height
            // This prevents the sticky nav from covering the section title
            const targetPosition = targetElement.offsetTop - navHeight;

            // Scroll smoothly to the calculated position
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

});