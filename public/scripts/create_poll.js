$(document).ready(function () {
  var max_fields = 20; //maximum input boxes allowed
  var wrapper = $(".input_fields_wrap"); //Fields wrapper
  var add_button = $(".add_field_button"); //Add button ID
  var x = 2; //initlal text box count
  $(add_button).click(function (e) { //on add input button click
    e.preventDefault();
    if (x < max_fields) { //max input box allowed
      x++; //text box increment
      $(wrapper).append(
        `<div>
          <label>Option ${x} </label>
          <input class="option" type="text" name="title[]">
          <input rows="3" name="description[]" placeholder = "description">
          <button class="remove_field btn btn-primary">Remove</button>
        </div>`); //add input box
    }
  });
  $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  });

  $(".poll_form").on("submit", function (e) {
    event.preventDefault();
    if ($(".email_field").val().length === 0) {
      alert('Please enter a valid email address');
      return;
    }
    if ($(".question_field").val().length === 0) {
      alert('Question field cannot be empty, please enter a question');
      return;
    }
    var flag = false;
    $(".option").each(function (index, element) {
      if ($(this).val().length === 0) {
        if (flag === false && index < 2) {
          alert('Please input at least two options');
          flag = true;
          return;
        }
      }
    });
    $.ajax({
      method: "POST",
      url: "/create",
      data: $(this).serialize()
    }).done(function(){
      //alert creator that poll has been created and links sent to email
    });
  });
});
