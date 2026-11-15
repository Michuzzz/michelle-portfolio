
/* =================================
   SMOOTH NAVIGATION
================================= */

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');

        if (targetId && targetId.startsWith('#')) {
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});


/* =================================
   ACTIVE NAVIGATION LINK
================================= */

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});
/* =================================
   PROJECT PAGINATION
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const projectCards = document.querySelectorAll(
        "#projectsGrid .project-card"
    );

    const previousButton = document.getElementById("prevProject");
    const nextButton = document.getElementById("nextProject");
    const pageNumbers = document.getElementById("projectPageNumbers");
    const pageStatus = document.getElementById("projectPageStatus");

    if (
        !projectCards.length ||
        !previousButton ||
        !nextButton ||
        !pageNumbers
    ) {
        return;
    }

    let currentPage = 0;

    function showProject(page) {

        // Keep the selected page within the available range
        currentPage = Math.max(
            0,
            Math.min(page, projectCards.length - 1)
        );

        // Show only the selected project
        projectCards.forEach(function (card, index) {

            if (index === currentPage) {
                card.classList.remove("is-hidden");
            } else {
                card.classList.add("is-hidden");
            }

        });

        // Update numbered page buttons
        pageNumbers.innerHTML = "";

        projectCards.forEach(function (_, index) {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "page-number";
            button.textContent = index + 1;
            button.setAttribute(
                "aria-label",
                "Go to project " + (index + 1)
            );

            if (index === currentPage) {
                button.classList.add("active");
                button.setAttribute("aria-current", "page");
            }

            button.addEventListener("click", function () {
                showProject(index);
            });

            pageNumbers.appendChild(button);

        });

        // Update Previous and Next buttons
        previousButton.disabled = currentPage === 0;
        nextButton.disabled =
            currentPage === projectCards.length - 1;

        // Update page status
        if (pageStatus) {
            pageStatus.textContent =
                "Project " + (currentPage + 1) +
                " of " + projectCards.length;
        }

    }

    previousButton.addEventListener("click", function () {
        showProject(currentPage - 1);
    });

    nextButton.addEventListener("click", function () {
        showProject(currentPage + 1);
    });

    // Display the first project when the page loads
    showProject(0);

});
