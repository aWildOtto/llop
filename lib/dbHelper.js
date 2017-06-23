'use strict'
const uuid = require('uuid/v4');


//-----------------db query functions------------
module.exports = (knex) => {
  return{
    getPollByAdminCode : (adminCode) => {
      return knex.select().from('polls').where({admin_code: adminCode});

    },
    getPollBySubCode: (submissionCode) => {
      return knex.select().from('polls').where({submission_code: submissionCode});

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
    saveVote : () => {

    }
  }
}