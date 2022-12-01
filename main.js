let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menu ul li button");
let sideMenuList = document.querySelectorAll(".side_menu ul li button");
let sideMenuBtn = document.getElementById("sideMenuBtn");
let sideMenuClose = document.getElementById("sideMenuClose");
let sideMenu = document.getElementById("sideMenu");
let searchBoxBtn = document.getElementById("searchBoxBtn");
let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("searchBtn");
let url;

sideMenuBtn.addEventListener('click', () => {
    sideMenu.style.left = 0 + '%';
});

sideMenuClose.addEventListener('click', () => {
    sideMenu.style.left = "-" + 100 + '%';
});


searchBoxBtn.addEventListener('click', () => {
    if (searchBox.style.width <= 0 + 'px'){
        searchBox.style.width = 230 + 'px';
    } else {
        searchBox.style.width = 0 + 'px';
    }
});

const getNews = async() => {

    try {

        let header = new Headers({ 'x-api-key': '6FigHN_l7E32POYazdC63Ot0yQh1tPngDZDfPKagksk' });

        url.searchParams.set('page', page);

        let response = await fetch(url, { headers: header });
        let data = await response.json();

        if (response.status == 200){

            if (data.total_hits == 0){
                throw new Error ("검색된 결과가 없습니다.");
            };

            news = data.articles;
            total_pages = data.total_pages;
            page = data.page;

            render();
            pagination();
        } else {
            throw new Error(data.message)
        };

    } catch(error){
        errorRender(error.message);
    }

    
}

async function getNewsByKeyword() {
    let searchText = document.getElementById("searchInput").value;

    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${searchText}&page_size=10`);

    getNews();
}

menus.forEach((menu) => menu.addEventListener("click", (e)=>getNewsByTopic(e)));
sideMenuList.forEach((sideMenuList) => sideMenuList.addEventListener("click", (e)=> {
        getNewsByTopic(e);
        sideMenu.style.left = "-" + 100 + '%';
    }));

const getLatestNews = async() => { // async 비동기 선언
    url = new URL('https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=5');
    
    getNews();
}

const getNewsByTopic = async(e) => {
    let toPic = e.target.textContent.toLowerCase();

    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10?topic=${toPic}`);

    getNews();
};

getLatestNews();





function render(){

    let resultHTML = "";

    resultHTML = news.map((item) => {
        return `<div class="news_item row">
            <div class="img_box col-lg-4">
                <img src="${item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}"/>
            </div>
            <div class="text_box col-lg-8">
                <h3>${item.title}</h3>
                <article id="item_article">${
                    item.summary == null || item.summary == ""
                    ? "No Content"
                    : item.summary.length > 200
                    ? item.summary.substr(0, 200) + "..."
                    : item.summary
                }
                </article>
                <span>${item.rights || "No source"} | ${moment().startOf(item.published_date).fromNow()}</span>
            </div>
        </div>`;
    }).join('');

    document.getElementById("newsList").innerHTML = resultHTML;
};

const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;

    document.getElementById("newsList").innerHTML = errorHTML;
}

const pagination = () => {
    let paginationHTML = "";

    let pageGroup = Math.ceil(page/5);
    let last = pageGroup * 5;
    let first = last - 4 <= 0 ? 1 : last - 4;

    if (last > total_pages) {
        last = total_pages;
    }

    if (first >= 6){
        paginationHTML = `
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(1)">
                <span aria-hidden="true">&lt;&lt;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page - 1})">
                <span aria-hidden="true">&lt;</span>
                </a>
            </li>
        `;
    };

    for (let i=first; i<=last; i++){
        paginationHTML += `<li class="page-item ${page == i ? "active" : ""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    };

    if (last < total_pages){
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page + 1})">
                <span aria-hidden="true">&gt;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${total_pages})">
                <span aria-hidden="true">&gt;&gt;</span>
                </a>
            </li>
        `;
    };

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNumber) => {
    page = pageNumber;

    getNews();
};


 
searchBtn.addEventListener("click", getNewsByKeyword);