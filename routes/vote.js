"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //nb: remove render code after testing done
  router.get("/", (req, res) => {
    // res.status(404).end("Must be invited to join a poll.");
    res.render('vote');
  });

  //nb: for testing only remove this entire route after database queries written
  router.post("/", (req, res) => {
    // res.status(404).end("Must be invited to join a poll.");
    console.log(req.body);
    res.status(200).send();
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
