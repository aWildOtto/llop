"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {

  //nb: remove render code after testing done
  router.get("/", (req, res) => {
    res.redirect('/error');
  });

  router.get('/:id',(req,res)=>{
    dbHelper.checkAdminCode(req.params.id).then((results)=>{
      console.log("results",results.length);
      if(results.length === 0){
        console.log('hello');
        res.render('error');
        return;
      }else{
        res.render('administrative',{uri : req.params.id});
        return;
      }
    })
    
  });

  router.get('/api/:id', (req,res) =>{
    dbHelper.getRankedChoicesByAdminCode(req.params.id).then((results)=>{
      console.log('these are the results', results.rows);
      res.json(results.rows);
    })
    .catch((err)=>{
      res.render('/error');
    });
  });
  return router;
}
