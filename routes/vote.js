"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {


  router.get("/", (req, res) => {
    res.status(404).end("Must be invited to join a poll.");
  });

  //nb: for testing only remove this entire route after database queries written
  router.post("/", (req, res) => {
    // res.status(404).end("Must be invited to join a poll.");
    res.status(200).send();
  });

  router.get('/:id',(req,res)=>{
    res.render('vote', {uri : req.params.id});
  });


  router.get('/api/:id', (req,res) =>{
    dbHelper.getPollAndChoicesBySubCode((results) => {
      res.json(results);
    },req.params.id);
  });

  router.post('/api/:id',(req,res)=>{


    for (var item in req.body) {

      console.log(item,":", req.body[item]);
    }
    console.log(req.body[1].name)
    res.status(200).send();
  });
  return router;
}
