const router = require('express').Router()
const {models:{Cat, Planet, PlaningRoute}}=require('../db')


router.get('/cats', async(req, res, next)=>{
  try{
    res.send(await Cat.findAll())
  }
  catch(ex){
    next(ex)
  }
})

router.get('/planets', async(req, res, next)=>{
  try{
    res.send(await Planet.findAll())
  }
  catch(ex){
    next(ex)
  }
})

router.get('/cats/:id/planing_route', async(req, res, next)=>{
  try{
      res.send(await PlaningRoute.findAll({
        where: {
          catId: req.params.id
        },
        include: [Planet]
      }))
  }
  catch(ex){
    next(ex)
  }
})


module.exports = router