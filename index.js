const apiKey = "062849b77e7232e0f57b88d0449a6496";
const URL = "https://gnews.io/api/v4/search?q=";

async function fetchNews(query) {
    const cardsContainer = document.querySelector('#cards-container');
    cardsContainer.innerText = "Loading.......";
    const response = await fetch(`${URL}${query}&token=${apiKey}`);
    const data = await response.json();
    console.log(data);
    bindata(data.articles);
}

// function reload() {
//     window.location.reload();
// }

window.addEventListener("load", () => {
    fetchNews("pakistan");
}
);

function bindata(articles) {
    const cardsContainer = document.querySelector('#cards-container');
    const newCardTemplate = document.querySelector('#template-news-card');

    cardsContainer.innerHTML = "";

    let card = "";
    articles.forEach((element) => {
        if (!element.image) {
            return;
        }

        card += `<a href="${element.url}" target="_blank">
        <div class="col" >
        <div class="card shadow-sm">
            <img src="${element.image}" alt="" id="news-img">
            <div class="card-body">
                <h5 class="news-title">${element.title}</h5>
                <h6 class="news-src">  ${element.source.name} : ${new Date(element.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })}</h6>
                <p class="card-text">${element.description}</p>
            </div>
        </div>
    </div>
    </a>`;

        // const cardClone = newCardTemplate.content.cloneNode(true);
        // cardsContainer.appendChild(cardClone);
    });

    cardsContainer.innerHTML = card;
}

function NewsOrginalWindowOpen(url) {
    window.open(url, "_blank");
}

function onNavItemClick(id) {
    closeOffCanvasNavbarInMob();
    fetchNews(id);
    removeActiveClass();
    document.querySelector(`#${id}`).classList.add('active');
}

function closeOffCanvasNavbarInMob() {
    const offcanvasNavbar = document.getElementById('offcanvasNavbar2');
    const offcanvasNavbarInstance = bootstrap.Offcanvas.getInstance(offcanvasNavbar);
    if (offcanvasNavbarInstance) {
        offcanvasNavbarInstance.hide();
    }
}



function removeActiveClass() {
    const navbarItems = document.querySelectorAll('.nav-link'); 
    navbarItems.forEach(item => {
        item.classList.remove('active');
    });
}


function searchByValue() {
    event.preventDefault();
    let searchText = document.querySelector('#search-text');
    let searchButton = document.querySelector('#search-button');
    let query = searchText.value;
    closeOffCanvasNavbarInMob();
    if (!query) return;
    removeActiveClass();
    fetchNews(query);
}
