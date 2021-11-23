const Sequelize = require('sequelize')
const {STRING, BOOLEAN, UUID, UUIDV4} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/cats_in_space_db')
const faker = require('faker')

let catsBreedData = new Array(20).fill('').map(_ => faker.animal.cat())
let catsNameData = new Array(20).fill('').map(_=> faker.name.firstName())

const Cat = conn.define('cat', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING,
  breed: STRING
})

const Planet = conn.define('planet', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING,
})

const PlaningRoute = conn.define('planing_route', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  }
})

PlaningRoute.belongsTo(Cat)
PlaningRoute.belongsTo(Planet)

const syncAndSeed = async()=>{
  await conn.sync({force: true})
  const cats = await Promise.all(
    catsNameData.map((name, idx) => Cat.create({name: name, breed: catsBreedData[idx]}))
  )
  const [Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune] = await Promise.all(
    ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map(name=> Planet.create({name}))
  )
  const planingRouts = await Promise.all([
    PlaningRoute.create({catId: cats[0].id, planetId: Mars.id})
  ])
}

module.exports ={
  models: {
    Cat, 
    Planet, 
    PlaningRoute, 
  },
  conn,
  syncAndSeed,
  catsNameData,
  catsBreedData
}
