"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {


  //nb: remove render code after testing done
  router.get("/", (req, res) => {
    // res.status(404).end("Must be invited to join a poll.");
    res.render('vote');
  });

  //nb: for testing only remove this entire route after database queries written
  router.post("/", (req, res) => {
    // res.status(404).end("Must be invited to join a poll.");
    for (var item in req.body) {
      console.log(item,":", req.body[item]);
      console.log('aloha')
    }
    res.status(200).send();
  });

  router.get('/:id',(req,res)=>{
    var question = '';
    dbHelper.getPollBySubCode((results) => {
      question = results[0].question;
      res.render('vote', {question: question});
    },req.params.id)
  });

  router.post('/:id',(req,res)=>{
    // knex.select().from('choices').where({polls_id: req.params.id}).asCallback((err,result)=>{
    //   res.json(result);
    // });
    res.render('vote');
  });
  return router;
}
