"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHealper) => {

  //nb: remove render code after testing done
  router.get("/", (req, res) => {
    res.status(404).end("Oops, there's no poll here!");
  });

  router.get('/:id',(req,res)=>{
    res.render('administrative',{uri : req.params.id});
    console.log(req.params.id)
  });

  router.get('/api/:id', (req,res) =>{
    dbHealper.getRankedChoicesByAdminCode(req.params.id).then((results)=>{
      console.log('these are the results', results.rows);
      res.json(results.rows);
    });
  });

  router.post('/:id',(req,res)=>{
    // knex.select().from('choices').where({polls_id: req.params.id}).asCallback((err,result)=>{
    //   res.json(result);
    // });
    res.render('administrative');
  });
  return router;
}
