import axios from 'axios'

const catList = document.querySelector('#cat-list')
const planetList = document.querySelector('#planet-list')
const routeList = document.querySelector('#route-list')

console.log(catList, planetList, routeList)

let cats, planingRoutes

const renderCats =(cats)=>{
  const catId = window.location.hash.slice(1)
  const html = cats.map( cat =>`
  <li class='${cat.id === catId ? 'selected': ''}'>
    <a href='#${cat.id}'>${cat.breed} cat "${cat.name}"</a>
  </li>
  `).join('')
  catList.innerHTML = html
}

planetList.addEventListener('click', async(ev)=>{
  const target = ev.target
  const catId = window.location.hash.slice(1)
  if(target.tagName === 'BUTTON'){
    const _planingRoute ={
      planetId: target.getAttribute('data-id')
    }
    const response = await axios.post(`/api/cats/${catId}/planing_route`, _planingRoute)
    const planingRoute = response.data
    console.log(planingRoute)
    planingRoutes.push(planingRoute)
    renderRoutes(planingRoutes)
  }
})

routeList.addEventListener('click', async(ev)=>{
  const target = ev.target
  if(target.tagName === 'BUTTON' ){
    const planingRouteId = target.getAttribute('data-id').substring(0, (target.getAttribute('data-id')).length - 4)
    const response = await axios.delete(`/api/planing_routes/${planingRouteId}`)
    const planingRoute = response.config.url.replace("/api/planing_routes/", "")
    planingRoutes = planingRoutes.filter(route => route.id !== planingRoute)
    renderRoutes(planingRoutes)
  }
})

const renderPlanets =(planets)=>{
  const html = planets.map( planet =>`
  <button data-id='${planet.id}' id='add-btn'>
    ${planet.name}
  </button>
  `).join('')
  planetList.innerHTML = html
}

const renderRoutes =(planingRoutes)=>{
  const html = planingRoutes.map( planingRoute =>`
  <li>
    ${planingRoute.planet.name}
    <button data-id='${planingRoute.id} id='delete-btn'>x</button>
  </li>
  `).join('')
  routeList.innerHTML = html
}

const init = async()=>{
  try{
    cats = (await axios.get('/api/cats')).data
    const planets = (await axios.get('/api/planets')).data
    renderCats(cats)
    renderPlanets(planets)
    const catId = window.location.hash.slice(1)
    if(catId){
      const url = `api/cats/${catId}/planing_route`
      console.log(url)
      planingRoutes = (await axios(url)).data
      renderRoutes(planingRoutes)
    }
  }
  catch(ex){
    console.log(ex)
  }
 }

 window.addEventListener('hashchange', async()=>{
   const catId = window.location.hash.slice(1)
   const url = `api/cats/${catId}/planing_route`
   planingRoutes = (await axios(url)).data
   renderRoutes(planingRoutes)
   renderCats(cats)
 })
 
 
 init()



