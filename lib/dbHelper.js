'use strict'
const uuid = require('uuid/v4');


//-----------------db query functions------------
module.exports = (knex) => {
  return{
    getPollByAdminCode : (adminCode) => {
      return knex.select().table('polls')
        .where({admin_code: adminCode});

    },

    getPollAndChoicesBySubCode: (cb, submissionCode) => {
      knex.select('polls.question', 'polls.creator_name', 'polls.anonymous', 'choices.id', 'choices.description', 'choices.title')
        .from('polls').leftJoin('choices', 'polls.id', 'choices.polls_id')
        .where({submission_code: submissionCode})
        .then(function(results){
          cb(results);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPollBySubCode: (cb, submissionCode) => {
      knex.select().table('polls')
        .where({submission_code: submissionCode})
        .then(function(results){
          cb(results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // checkPollExist : (code) => {
    //   return knex.select().from('polls').where({admin_code: code}).orWhere({admin_code: code}).limit(1).count('*').then(val => val === 1);
    // },
    saveChoice : (polls_id, title, description) => {
      return knex('choices').insert({
        polls_id,
        title,
        description
      }).returning('id');
    },

    saveChoices : (rows) => {
      return knex.insert(rows).into('choices');
    },

    savePoll : (creator_name,
                      creator_email,
                      question,
                      background_path,
                      anonymous
                    ) => {

      let admin_code = uuid(), submission_code = uuid();
      return knex('polls').insert({
        creator_name,
        creator_email,
        question,
        admin_code,
        submission_code,
        anonymous: !!anonymous
      })
      .returning('id');
    },

    saveName: (name) => {
      return knex('voters').insert({

      })
      //return voter_id here
    },

    saveVote : (obj) => {
      return knex.insert({
      choices_id: id,
      rank: rank
      })
      .into('voter_choice')
      .then(() => {
        console.log('had to call something,will change later');
      })
      .catch((err) => {
        console.log(err);
      });

    }

  }
}
