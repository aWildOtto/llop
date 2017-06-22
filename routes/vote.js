"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //nb: remove render code after testing done
  router.get("/", (req, res) => {
    // res.status(404).end("Must be invited to join a poll.");
    res.render('vote');
  });

  router.get('/:id',(req,res)=>{
    // knex.select().from('choices').where({polls_id: req.params.id}).asCallback((err,result)=>{
    //   res.json(result);
    // });
    res.render('vote');
  });

  router.post('/:id',(req,res)=>{
    // knex.select().from('choices').where({polls_id: req.params.id}).asCallback((err,result)=>{
    //   res.json(result);
    // });
    res.render('vote');
  });
  return router;
}
