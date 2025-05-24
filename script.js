const maxTabletWidth = 1024;

document.addEventListener('DOMContentLoaded', function() {
    const category = window.location.pathname.split('/').pop().replace('.html', '');
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
            populateDropdown(data);

            const acronymsDiv = document.getElementById('acronyms');
            if (acronymsDiv) {
                displayAcronyms(akronimiData, acronymsDiv);
            }
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });

    function populateDropdown(data) {
        const dropdownContent = document.getElementById('category-dropdown');
        if (dropdownContent) {
            dropdownContent.innerHTML = '';
            const sortedCategories = Object.keys(data).sort();
            sortedCategories.forEach(cat => {
                if (cat !== category) {
                    const link = document.createElement('a');
                    link.href = `${cat}.html`;
                    link.textContent = cat.replace(/_/g, ' ');
                    dropdownContent.appendChild(link);
                }
            });
        }
    }

    function displayAcronyms(data, container) {
        container.innerHTML = '';
        data.forEach(item => {
            const acronymDiv = document.createElement('div');
            acronymDiv.className = 'acronym';
            acronymDiv.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div>${item.akronim}</div>
                    </div>
                    <div class="flip-card-back">
                        <div>
                            <p class="full-name">${item.puni_naziv}</p>
                            <p class="definition" id="definition-${item.akronim}">${item.definicija}</p>
                            <div class="language-buttons">
                                <button class="btn-en" onclick="changeLanguage(event, '${item.akronim}', 'en')" style="display: none;">EN</button>
                                <button class="btn-hr" onclick="changeLanguage(event, '${item.akronim}', 'hr')">HR</button>
                            </div>
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

    window.changeLanguage = function(event, akronim, lang) {
        event.stopPropagation();
        const definitionElement = document.getElementById(`definition-${akronim}`);
        const akronimDataItem = akronimiData.find(item => item.akronim === akronim);

        if (!akronimDataItem) return;

        const btnHr = event.target.closest('.language-buttons').querySelector('.btn-hr');
        const btnEn = event.target.closest('.language-buttons').querySelector('.btn-en');

        if (lang === 'hr') {
            definitionElement.textContent = akronimDataItem.definicija_hr;
            btnHr.style.display = 'none';
            btnEn.style.display = 'inline-block';
        } else {
            definitionElement.textContent = akronimDataItem.definicija;
            btnHr.style.display = 'inline-block';
            btnEn.style.display = 'none';
        }
    };

    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            const searchTerm = searchBar.value.toLowerCase();
            const filteredData = akronimiData.filter(item =>
                item.akronim.toLowerCase().includes(searchTerm) ||
                item.puni_naziv.toLowerCase().includes(searchTerm)
            );
            const acronymsDiv = document.getElementById('acronyms');
            if (acronymsDiv) {
                displayAcronyms(filteredData, acronymsDiv);
            }
        });
    }

    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
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
    }

    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownContent = document.getElementById('category-dropdown');
    const dropdownArrow = document.getElementById('dropdown-arrow');

    dropdownContent.classList.add('hidden');

    
    if (dropdownArrow) {
        dropdownArrow.textContent = '▼'; 
    }

    if (dropdownButton && dropdownContent && dropdownArrow) {
        dropdownButton.addEventListener('click', function () {
            dropdownContent.classList.toggle('hidden');

            if (window.screen.width >= maxTabletWidth) {
                return;
            }
            
            if (dropdownContent.classList.contains('hidden')) {
                dropdownArrow.textContent = '▼';
            } else {
                dropdownArrow.textContent = '▲';
            }
        });
    }
});
