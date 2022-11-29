let news = [];

const getLatestNews = async() => { // async 비동기 선언
    url = new URL('https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10');
    let header = new Headers({'x-api-key' : 'Qg87rpfip3L5fz1tljwEPobp0Vzpuhw7hIkaVlMkCE8'});

    let response = await fetch(url,{headers:header}); // ajax, http, fetch 3가지 중 가능 (Promise는 데이터를 리턴해주는 객체, pending은 아직 데이터가 도착하지 않았다는 뜻, Response 데이터 도착)

    let data = await response.json(); // json을 통해 서버에서 데이터를 뽑아내기

    news = data.articles;

    console.log(data);
}

getLatestNews();

dddd
let sideMenuBtn = document.getElementById("sideMenuBtn");
let sideMenuClose = document.getElementById("sideMenuClose");
let sideMenu = document.getElementById("sideMenu");
let searchBoxBtn = document.getElementById("searchBoxBtn");
let searchBox = document.getElementById("searchBox");

ddd
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

    resultHTML += `
        <div class="news_item row">
            <div class="img_box col-lg-4">
                <img src="https://i.ebayimg.com/images/g/mJ4AAOSwahFfIOyL/s-l1600.jpg">
            </div>
            <div class="text_box col-lg-8">
                <h3>news headline</h3>
                <article>news contentnews contentnews contentnews contentnews contentnews contentnews contentnews contentnews contentnews contentnews contentnews content</article>
                <span>inwell.com 2021-11-13 06:30:00</span>
            </div>
        </div>
    `

    document.getElementById("newsList").innerHTML = resultHTML;
};

render();
