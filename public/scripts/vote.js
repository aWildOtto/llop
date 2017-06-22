$(document).ready(function(){

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
            }
  };

  $(function sortable() {
        $( "#sortable" ).sortable({
            placeholder: 'ui-sortable-placeholder'
        });
    });

  function makeList(obj){
    var $div = $('<div>');
    $div.append(question.content).attr('questionId', question.id);
    $('#vote_form').prepend($div);
    for (var item in obj) {
      var $li = $('<li>');
      $li.append(obj[item].content).addClass('ui-state-default').attr('choiceId', obj[item].id);
      $('.sortable').append($li);
    }
  };

  makeList(obj);

  $('#vote_form').on('submit', function(event) {
    event.preventDefault();
    var $sortableList = $('.sortable');
    var $listElements = $sortableList.children();
    console.log($listElements);
    var choiceIdsRanked = [];
    for (var i = 0; i < $listElements.length; i ++) {
      choiceIdsRanked.push($listElements[i].attributes.choiceId.nodeValue);
    }
    console.log(choiceIdsRanked);
  })
});
