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
    dbHelper.checkSubCode(req.params.id).then((result) => {
      if(result.length === 0){
        res.render('error');
        return;
      }else{
        res.render('vote', {uri : req.params.id});
        return;
      }
    });
    
  });

  router.get('/api/:id', (req,res) =>{
    dbHelper.getPollAndChoicesBySubCode(req.params.id).then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.redirect('/error');
      console.log(err);
    });
  });

  router.post('/api/:id',(req,res)=>{
    // console.log(item,":", req.body[item]);
    console.log(req.body);
    const poll_id_prom = dbHelper.getPollIdBySubCode(req.params.id);
    const voter_create_prom = poll_id_prom.then((poll_id)=>{
      console.log("poll_id",poll_id[0].id);
      return dbHelper.saveVoter(poll_id[0].id, req.body.name);
      }
    );
    const allVoter_choices_prom = voter_create_prom.then((voter_id) => {
      console.log("voter_id",voter_id[0]);
      const voteInsertPromises = [];
      for(let rank in req.body){
        voteInsertPromises.push(dbHelper.saveVoterChoice(voter_id[0], Number(req.body[rank].choiceIds),Number(rank)));
      }
      return Promise.all(voteInsertPromises);
    });
    allVoter_choices_prom.then(()=>{
      res.status(201).send();
    })
    .catch((err)=>{
      res.redirect('/error');
      console.log(err);
    });
  });

  return router;
}
