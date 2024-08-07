document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    const intervalTime = 3000; // Change slide every 3 seconds

    // Create dots
    items.forEach((item, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            moveToIndex(index);
            resetInterval(); // Reset the interval on manual dot click
        });
        dotsContainer.appendChild(dot);
    });

    function moveToIndex(index) {
        currentIndex = index;
        carousel.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Automatic sliding
    let interval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % items.length;
        moveToIndex(nextIndex);
    }, intervalTime);

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % items.length;
            moveToIndex(nextIndex);
        }, intervalTime);
    }
    
     fetch('http://localhost:5000/api/projects')
        .then(response => response.json())
        .then(data => displayProjects(data))
        .catch(error => console.error('Error fetching projects:', error));
});
