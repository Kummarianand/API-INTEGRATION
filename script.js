const API_KEY = '132c0b00552143fba4f765290c2355d4'; // Get it from https://newsapi.org
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

async function fetchNews(query = '') {
  const url = query 
    ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}` 
    : BASE_URL;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.articles) {
      displayNews(data.articles);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const newsCard = `
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card">
          <img src="${article.urlToImage || 'https://via.placeholder.com/400'}" class="card-img-top img-fluid" alt="News Image" />
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank" class="btn">Read More</a>
          </div>
        </div>
      </div>
    `;
    newsContainer.insertAdjacentHTML('beforeend', newsCard);
  });
}

function searchNews() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    fetchNews(query);
  } else {
    fetchNews();
  }
}

// Fetch initial news when the page loads
window.onload = () => fetchNews();
