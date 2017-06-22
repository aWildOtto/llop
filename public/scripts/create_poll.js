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
            `<div><label>Option ${x} </label><input type="text" name="title"> <input rows="3" name="description"><button class="remove_field">Remove</button></div>`); //add input box
        }
      });

      $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
      })
    });
