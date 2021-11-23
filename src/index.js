import axios from 'axios'

const catList = document.querySelector('#cat-list')
const planetList = document.querySelector('#planet-list')
const routeList = document.querySelector('#route-list')

console.log(catList, planetList, routeList)

const renderCats =(cats)=>{
  const html = cats.map( cat =>`
  <li>
    <a href='#${cat.id}'>${cat.breed} cat "${cat.name}"</a>
  </li>
  `).join('')
  catList.innerHTML = html
}

const renderPlanets =(planets)=>{
  const html = planets.map( planet =>`
  <li>
    ${planet.name}
  </li>
  `).join('')
  planetList.innerHTML = html
}

const renderRoutes =(planingRoutes)=>{
  const html = planingRoutes.map( planingRoute =>`
  <li>
    ${planingRoute.planet.name}
  </li>
  `).join('')
  routeList.innerHTML = html
}

const init = async()=>{
  try{
    const cats = (await axios.get('/api/cats')).data
    const planets = (await axios.get('/api/planets')).data
    renderCats(cats)
    renderPlanets(planets)
    const catId = window.location.hash.slice(1)
    const url = `api/cats/${catId}/planing_route`
    console.log(url)
    const planingRoute = (await axios(url)).data
    renderRoutes(planingRoute)
  }
  catch(ex){
    console.log(ex)
  }
 }

 window.addEventListener('hashchange', async()=>{
   const catId = window.location.hash.slice(1)
   const url = `api/cats/${catId}/planing_route`
   const planingRoute = (await axios(url)).data
   renderRoutes(planingRoute)
 })
 
 
 init()



