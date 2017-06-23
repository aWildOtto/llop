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
    res.render('vote', {uri : req.params.id});
  });


  router.get('/api/:id', (req,res) =>{
    // dbHelper.getPollBySubCode((results) => {
    //   var questionObj = {};
    //   questionObj[req.params.id] = results[0].question;
    //   console.log('questionObj is ',questionObj);
    //   console.log('question is',questionObj[req.params.id]);
    //   console.log(JSON.stringify(questionObj));
    //   res.json(questionObj);
    // },req.params.id);
    dbHelper.getPollAndChoicesBySubCode((results) => {
      res.json(results);
    },req.params.id);
  });

  router.post('/:id',(req,res)=>{
    // knex.select().from('choices').where({polls_id: req.params.id}).asCallback((err,result)=>{
    //   res.json(result);
    // });
    res.render('vote');
  });
  return router;
}
