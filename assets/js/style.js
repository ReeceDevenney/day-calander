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

var current = moment().format("h A");

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

hourText = []

$(".btn-info").on("click", function(){
    hourText.push(($(this).siblings(".text-area").children().text()))
    saveText()
})

var loadText = function () {
    hourText = JSON.parse(localStorage.getItem("hourText"));

    if (!hourText) {
        hourText = {
        }

    }
}

var saveText = function () {
    localStorage.setItem("hourText", JSON.stringify(hourText));
  };

timeAudit()