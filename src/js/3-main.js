const listItems = document.querySelector('.post-list__list');
const itemHighlighted = document.querySelector('.post-list__highlighted');

async function getData() {
    const response = await fetch('https://teste-frontend.seox.com.br/wp-json/wp/v2/posts?_embed');
    const data = await response.json();
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

getData()

const controls = document.querySelectorAll('.main-header .navigation .navigation--item');
let postListItems;
let current = 0;

controls.forEach((control) => {
    control.addEventListener('click', () => {
        const isDown = control.classList.contains('navigation--item--down');
        postListItems = document.querySelectorAll('.post-list .post-list__list .card');
        const maxItems = postListItems.length;

        if(isDown) {
            current += 1;
        } else {
            current -= 1;
        }

        if(current > 0){
            controls[0].classList.remove('navigation--item--disable')
        }

        if(current >= maxItems - 2){
            controls[1].classList.add('navigation--item--disable')
        }


        postListItems[current].scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        })

    })
});

// getBoundingClientRect