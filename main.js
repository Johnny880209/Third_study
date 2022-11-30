let news = [];
let menus = document.querySelectorAll(".menu ul li button");
let sideMenuBtn = document.getElementById("sideMenuBtn");
let sideMenuClose = document.getElementById("sideMenuClose");
let sideMenu = document.getElementById("sideMenu");
let searchBoxBtn = document.getElementById("searchBoxBtn");
let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("searchBtn");


async function getNewsByKeyword() {
    let searchText = document.getElementById("searchInput").value;

    let url = new URL(`https://api.newscatcherapi.com/v2/search?q=${searchText}&page_size=10`);

    let header = new Headers({ 'x-api-key': 'G1xMfUZIz4-Fr35spkw9_eziMI_VFVLxYPkKYcp5aKs' });

    let response = await fetch(url, { headers: header });

    let data = await response.json();

    news = data.articles;

    render();
}


menus.forEach((menu) => menu.addEventListener("click", (e)=>getNewsByTopic(e)));

const getLatestNews = async() => { // async 비동기 선언
    url = new URL('https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10');
    let header = new Headers({'x-api-key' : 'G1xMfUZIz4-Fr35spkw9_eziMI_VFVLxYPkKYcp5aKs'});

    let response = await fetch(url,{headers:header}); // ajax, http, fetch 3가지 중 가능 (Promise는 데이터를 리턴해주는 객체, pending은 아직 데이터가 도착하지 않았다는 뜻, Response 데이터 도착)

    let data = await response.json(); // json을 통해 서버에서 데이터를 뽑아내기

    news = data.articles;

    console.log(news);

    render();
}

const getNewsByTopic = async(e) => {
    let toPic = e.target.textContent.toLowerCase();

    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10?topic=${toPic}`);

    let header = new Headers({'x-api-key' : 'G1xMfUZIz4-Fr35spkw9_eziMI_VFVLxYPkKYcp5aKs'});

    let response = await fetch(url,{headers:header});

    let data = await response.json();

    news= data.articles;

    render ();
};

getLatestNews();



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


searchBtn.addEventListener("click", getNewsByKeyword);
