// .then(res => {

// }, err => {

// })

// function waitTwoSecond(){
//     console.log("Funksiya ishlashni boshladi")

// function makeFullname(name, lastname, middlename) {
//     return `${lastname} ${name} ${middlename}`
// }

// function getUserData() {
//     let user = null
//     const getUserPromise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("2s dan so'ng")
//             const date = Date.now()
//             if (date % 2 === 0) {
//                 user = {
//                     name: "Alex",
//                     surname: "Doe",
//                     middlename: "Alekseyevich"
//                 }
//                 resolve(user)
//             }
//             reject("Kutilmagan xato")
//         }, 2000)
//     })
//     return getUserPromise
// }
// const getUserPromise = getUserData()
// const samplePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(14)
//     }, 3000)
// })

// fetch().then(res => res.json()).th

// getUserPromise
//     .then(user => { return JSON.stringify(user) })
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(err)
//     })

// async function logger(){
//     try {
//         const user = await getUserData()
//         if(user.name !== 'John')throw new Error("Foydalanuvhi nomi xato")

//         console.log(user)
//     } catch (error) {
//         console.log(error.message)

//     }
// }

// logger()

// .then((res) => {
//     console.log(makeFullname(res.name, res.surname, res.middlename))
// })
// .catch(err => {
//     console.log(err)
// })

// Promise.any([getUserPromise, samplePromise])
// .then(results => {
//     console.log(results)
// })


// .finally(() => {
//     console.log("Backendga so'rov jo'natish tugatildi")
// })

// const newPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("2s dan so'ng")
//         const user = {
//             name:"John",
//             surname:"Doe",
//             middlename:"Alekseyevich"
//         }
//         resolve(user)
//     }, 2000)
// })
// newPromise
//     .then((res) => {
//         console.log("Amal muvaffaqiyatli bajarildi")
//         console.log(makeFullname(res.name, res.surname, res.middlename))
//     })
//     .catch(err => {
//         console.log("Amal muvaffaqiyatli bajarilmadi")
//         console.log(err)
//     })


//     return
// }


// DOM Elements
var movieItemTemplate = document.getElementById('movie-card').content
var movieListEl = document.getElementById('movie-list')
var searchInputEl = document.getElementById('search-input')
var searchFormEl = document.getElementById('search-form')

var loaderEl = document.querySelector('#loader')
// Api actions
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
// render functions
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