'use strict'



//-----------------db query functions------------
module.exports = (knex) => {
  return{
    getPollByAdminCode : (adminCode) => {
      return knex.select().table('polls')
        .where({admin_code: adminCode});

    },
    
    getPollIdBySubCode: (submission_code)=>{
      return knex.select('id').from('polls').where({ submission_code: submission_code});
    },

    getPollAndChoicesBySubCode: (submissionCode) => {
      return knex.select('polls.question', 'polls.creator_name', 'polls.anonymous', 'choices.id', 'choices.description', 'choices.title')
        .from('polls').leftJoin('choices', 'polls.id', 'choices.polls_id')
        .where({submission_code: submissionCode});
    },
    
    getRankedChoicesByAdminCode: (adminCode) => {
      return knex.raw(
        `select polls.question, 
        polls.creator_name, 
        polls.anonymous, 
        choices.id, 
        choices.description, 
        choices.title 
        from polls left join choices 
        on polls.id = choices.polls_id 
        where admin_code = ? 
        order by 
        (select sum(rank) from voter_choice where choices_id = choices.id)
        ;
        `, adminCode
      );
    },

    getPollBySubCode: (submissionCode) => {
      return knex.select().table('polls')
        .where({submission_code: submissionCode});
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
                      anonymous,
                      admin_code,
                      submission_code
                    ) => {
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

    saveVoter : (poll_id, name) => {
      return knex('voters').insert({
        polls_id: Number(poll_id),
        name
      })
      .returning('id');
    },

    saveVoterChoice: (voters_id, choices_id, rank) => {
      return knex('voter_choice').insert({
        voters_id,
        choices_id,
        rank
      }).returning('id');
    }
  }
}
