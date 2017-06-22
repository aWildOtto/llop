"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //nb: remove render code after testing done
  router.get("/", (req, res) => {
    // res.status(404).end("Must be invited to join a poll.");
    res.render('administrative');
  });

  router.get('/:id',(req,res)=>{
    // knex.select().from('choices').where({polls_id: req.params.id}).asCallback((err,result)=>{
    //   res.json(result);
    // });
    res.render('administrative');
  });

  router.post('/:id',(req,res)=>{
    // knex.select().from('choices').where({polls_id: req.params.id}).asCallback((err,result)=>{
    //   res.json(result);
    // });
    res.render('administrative');
  });
  return router;
}
