const listItems = document.querySelector('.post-list__list');
const itemHighlighted = document.querySelector('.post-list__highlighted');

async function getDados() {
    const teste = await fetch('https://teste-frontend.seox.com.br/wp-json/wp/v2/posts?_embed');
    const data = await teste.json();
    let i = 0;

    data.forEach(element => {
        if (i == 0) {
            itemHighlighted.innerHTML += `
            <a href="${element.link}" class="card card--highlighted">
                <img src="${element._embedded['wp:featuredmedia'][0]['source_url']}" alt="" class="card--featured-img">
                <div class="card--icon-video"></div>
                <div class="card--featured-img-hover"></div>
                <div class="card--data">
                    <p class="card--comments"><span>29</span></p>
                    <strong class="card--category">${element.acf.hat}</strong>
                    <h2 class="card--title">${element.title.rendered}</h2>
                </div>
            </a>`;
            i++;
        } else {
            listItems.innerHTML += `
            <a href="${element.link}" class="card">
                <img src="${element._embedded['wp:featuredmedia'][0]['source_url']}" alt="" class="card--featured-img">
                <div class="card--icon-video"></div>
                <div class="card--featured-img-hover"></div>
                <div class="card--data">
                    <p class="card--comments"><span>29</span></p>
                    <strong class="card--category">${element.acf.hat}</strong>
                    <h2 class="card--title">${element.title.rendered}</h2>
                </div>
            </a>`;
            i++;
        }
    });
}

getDados()