// on click turns the section of the calander into a text area to write in
$(".text-area").on("click", "p", function () {
    var text = $(this)
        .text()
        .trim();
    
    var id = $(this).attr("id")

    // replace p element with a new textarea
    var textInput = $("<textarea>")
        .addClass("form-control px-0 w-100")
        .val(text)
        .attr("id", id)
    $(this).replaceWith(textInput);

    textInput.trigger("focus")
})
// when clicking off of the text area, return it to a <p>
$(".text-area").on("blur", "textarea", function () {
    var text = $(this).val();
    var id = $(this).attr("id")

    var blurText = $("<p>")
    .text(text)
    .removeClass("form-control")
    .addClass("w-100 h-100 text-box")
    .attr("id", id);

    $(this).replaceWith(blurText)

    timeAudit()
})

// adds current day to the top of the page
var now = moment().format("MMMM Do YYYY");
$("#currentDay").text(now)
//give the current time
var current = moment().format("h A");
//checks for the difference between the blocks time and current time and changes the background accordingly
var timeAudit = function(){
    $(".text-box").each(function() {
        var timeTable = moment($(this).attr("id").replace("-Text",""), "h A")
        $(this).removeClass("bg-danger bg-danger bg-light")
        var timeDifference = moment().diff(timeTable, "minutes")
    
        if (timeDifference > 60) {
            $(this).addClass("bg-light")
        } else if (0 < timeDifference && timeDifference < 60) {
            $(this).addClass("bg-danger")
        } else {
            $(this).addClass("bg-success")
        }
      });
} 
//on clicking the save button save the info to the local storage.  the key is the text-area's ID and the value is the text in the box
$(".btn-info").on("click", function(){
    var key = ($(this).siblings(".text-area").children().attr("id"))
    var value = ((($(this).siblings(".text-area").children().text())))
    localStorage.setItem(key, value)
})
// update text-areas with what is saved in local storage, matching based on the key value and the area's ID
$(".text-box").each(function(){
    $(this).text(localStorage.getItem($(this).attr("id")))
})

timeAudit()