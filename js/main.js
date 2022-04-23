
var movieItemTemplate = document.getElementById('movie-card').content
var movieListEl = document.getElementById('movie-list')
var searchInputEl = document.getElementById('search-input')
var searchFormEl = document.getElementById('search-form')

var loaderEl = document.querySelector('#loader')

const API_KEY = '5f992696'

async function getMovies(search = "hulk", pageNumber = 1) {
    let response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${pageNumber}`)
    response = await response.json()
    return response
}

searchFormEl.addEventListener('submit', event => {
    event.preventDefault()
    renderMovies(movieListEl)
})

window.addEventListener('load', () => {
    loaderEl.classList.remove('loader__show')
})
var currentPage = 1

var paginationEl = document.querySelector('.pagination')
var paginationNextEl = document.querySelector('#next-btn')
var paginationPrevEl = document.querySelector('#prev-btn')
paginationNextEl.addEventListener('click', event => {
    if(!isNaN(Number(event.target.dataset.pageId))){
        renderMovies(movieListEl, event.target.dataset.pageId)
        currentPage++
    }
})

paginationPrevEl.addEventListener('click', event => {
    if(!isNaN(Number(event.target.dataset.pageId))){
        renderMovies(movieListEl, event.target.dataset.pageId)
        currentPage--
    }
})

async function renderMovies(node, page =1) {
        loaderEl.classList.add('loader__show')
        let response
        try {
            response = await getMovies(searchInputEl.value, page)
            console.log(response)
        } catch (error) {
            console.log(error)

        }
    
        const movies = response.Search
        let maxLength = response.totalResults
        node.innerHTML = null
        let movieListFragment = document.createDocumentFragment()

        movies.forEach(element => {
            let movieItemEl = document.importNode(movieItemTemplate, true)

            let cardImgEl = movieItemEl.querySelector('.card__img')
            cardImgEl.setAttribute('src', element.Poster)

            let cardTitleEl = movieItemEl.querySelector('.card-title')
            cardTitleEl.textContent = element.Title

            let cardTextEl = movieItemEl.querySelector('.card-text')
            cardTextEl.textContent = element.Year

            movieListFragment.appendChild(movieItemEl)
        })  

        if(currentPage <=1){
            let prevLink = paginationPrevEl.querySelector('div.page-link')
            prevLink.dataset.pageId = null
            let nextLink = paginationNextEl.querySelector('div.page-link')
            nextLink.dataset.pageId = currentPage+1   
            console.log(currentPage, 'changed') 
        }else if(currentPage > maxLength/10){
            let prevLink = paginationPrevEl.querySelector('div.page-link')
            prevLink.dataset.pageId = currentPage-1 
            let nextLink = paginationNextEl.querySelector('div.page-link')
            nextLink.dataset.pageId = null       
        }else{
            let prevLink = paginationPrevEl.querySelector('div.page-link')
            prevLink.dataset.pageId = currentPage-1
            let nextLink = paginationNextEl.querySelector('div.page-link')
            nextLink.dataset.pageId = currentPage+1
        }
        
        node.appendChild(movieListFragment)
        loaderEl.classList.remove('loader__show')
}



function showLoader() {
    let cloneLoader = document.importNode(loaderEl, true)
    console.log(cloneLoader)
}
renderMovies(movieListEl)