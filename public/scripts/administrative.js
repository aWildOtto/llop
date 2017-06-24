$(document).ready(function(){

// database stand-in, delete later
  var question = {
    id: 123,
    content: 'Which fruit is the root of all evils and should be eliminated from the earth?'
  };
  var obj = {
    item1 : { id: 1,
              content : 'apple'
            },
    item2 : { id: 2,
              content: 'orange'
            },
    item3 : { id: 3,
              content: 'banana'
            },
    item4 : { id: 'new',
              content: 'melon'
            },
    item5 : { id: 'donald',
              content: 'pineapple'
            },
    item6 : { id: 'caitlin',
            content: 'blackberries'
            }
  };

// Dynamically generate list of options
// only diff from vote page: not drag and drop
  function makeList(obj){
    var $div = $('<div>');
    $div.append(question.content).attr('questionId', question.id).addClass('question_wrapper');
    $('.question').append($div);
    for (var item in obj) {
      var $li = $('<li>');
      $li.append(obj[item].content).addClass('options');
      $('.results').append($li);
    }
  };
  makeList(obj);
});
