// Script from Funny.html
document.addEventListener('DOMContentLoaded', function() {
    const category = 'Funny';
    let akronimiData = [];
    fetch('akronimi.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            akronimiData = data[category] || [];
            const categoryDropdown = document.getElementById('category-dropdown');
            for (const cat in data) {
                if (cat !== category) {
                    const categoryLink = document.createElement('a');
                    categoryLink.href = `${cat}.html`;
                    categoryLink.textContent = cat.replace(/_/g, ' ');
                    categoryDropdown.appendChild(categoryLink);
                }
            }

            const acronymsDiv = document.getElementById('acronyms');
            displayAcronyms(akronimiData, acronymsDiv);
        })
        .catch(error => {
            document.getElementById('error-message').textContent = 'Error loading JSON: ' + error;
            console.error('Error loading JSON:', error);
        });

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredData = akronimiData.filter(item =>
            item.akronim.toLowerCase().includes(searchTerm) ||
            item.puni_naziv.toLowerCase().includes(searchTerm)
        );
        const acronymsDiv = document.getElementById('acronyms');
        displayAcronyms(filteredData, acronymsDiv);
    });

    const backToTopButton = document.getElementById('back-to-top');
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    function displayAcronyms(data, container) {
        container.innerHTML = '';
        data.forEach(item => {
            const acronymDiv = document.createElement('div');
            acronymDiv.className = 'acronym';
            acronymDiv.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <h2>${item.akronim}</h2>
                    </div>
                    <div class="flip-card-back">
                        <div>
                            <p class="full-name">${item.puni_naziv}</p>
                        </div>
                    </div>
                </div>
            `;
            acronymDiv.querySelector('.flip-card-inner').addEventListener('click', function() {
                acronymDiv.classList.toggle('flipped');
            });
            container.appendChild(acronymDiv);
        });
    }
});

// Script from index.html
document.addEventListener('DOMContentLoaded', function() {
    fetch('akronimi.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const categoriesDiv = document.getElementById('categories');
            for (const category in data) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'category';
                categoryDiv.textContent = `${category.replace(/_/g, ' ')} (${data[category].length})`;

                categoryDiv.addEventListener('click', function() {
                    window.location.href = `${category}.html`;
                });
                categoriesDiv.appendChild(categoryDiv);
            }
        })
        .catch(error => {
            document.getElementById('error-message').textContent = 'Error loading JSON: ' + error;
            console.error('Error loading JSON:', error);
        });

    document.getElementById('show-all').addEventListener('click', function() {
        window.location.href = 'Svi_akronimi.html';
    });
});

// Script from Web_development.html
document.addEventListener('DOMContentLoaded', function() {
    const category = 'Web_development';
    let akronimiData = [];
    fetch('akronimi.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            akronimiData = data[category] || [];
            const categoryDropdown = document.getElementById('category-dropdown');
            for (const cat in data) {
                if (cat !== category) {
                    const categoryLink = document.createElement('a');
                    categoryLink.href = `${cat}.html`;
                    categoryLink.textContent = cat.replace(/_/g, ' ');
                    categoryDropdown.appendChild(categoryLink);
                }
            }

            const acronymsDiv = document.getElementById('acronyms');
            displayAcronyms(akronimiData, acronymsDiv);
        })
        .catch(error => {
            document.getElementById('error-message').textContent = 'Error loading JSON: ' + error;
            console.error('Error loading JSON:', error);
        });

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredData = akronimiData.filter(item =>
            item.akronim.toLowerCase().includes(searchTerm) ||
            item.puni_naziv.toLowerCase().includes(searchTerm)
        );
        const acronymsDiv = document.getElementById('acronyms');
        displayAcronyms(filteredData, acronymsDiv);
    });

    const backToTopButton = document.getElementById('back-to-top');
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    function displayAcronyms(data, container) {
        container.innerHTML = '';
        data.forEach(item => {
            const acronymDiv = document.createElement('div');
            acronymDiv.className = 'acronym';
            acronymDiv.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <h2>${item.akronim}</h2>
                    </div>
                    <div class="flip-card-back" data-definicija="${item.definicija}" data-definicija-hr="${item.definicija_hr}">
                        <div>
                            <p class="full-name">${item.puni_naziv}</p>
                            <p class="definition">${item.definicija}</p>
                            <div class="language-buttons">
                                <button class="btn-hr" onclick="changeLanguage(event, 'hr')">HR</button>
                                <button class="btn-en" onclick="changeLanguage(event, 'en')" style="display: none;">EN</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            acronymDiv.querySelector('.flip-card-inner').addEventListener('click', function(event) {
                if (!event.target.classList.contains('btn-hr') && !event.target.classList.contains('btn-en')) {
                    acronymDiv.classList.toggle('flipped');
                }
            });
            container.appendChild(acronymDiv);
        });
    }

    window.changeLanguage = function(event, lang) {
        event.stopPropagation();
        const definitionElement = event.target.closest('.flip-card-back').querySelector('.definition');
        const definicija = event.target.closest('.flip-card-back').dataset.definicija;
        const definicijaHr = event.target.closest('.flip-card-back').dataset.definicijaHr;
        const btnHr = event.target.closest('.language-buttons').querySelector('.btn-hr');
        const btnEn = event.target.closest('.language-buttons').querySelector('.btn-en');
        if (lang === 'hr') {
            definitionElement.textContent = definicijaHr;
            btnHr.style.display = 'none';
            btnEn.style.display = 'inline-block';
        } else {
            definitionElement.textContent = definicija;
            btnHr.style.display = 'inline-block';
            btnEn.style.display = 'none';
        }
    };
});

document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('search-icon');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-container input[type="text"]');

    searchIcon.addEventListener('click', function() {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    document.addEventListener('click', function(event) {
        if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
            searchContainer.classList.remove('active');
        }
    });
});