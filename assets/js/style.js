$(".text-area").on("click", "p", function () {
    var text = $(this)
        .text()
        .trim();

    // replace p element with a new textarea
    var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);
    $(this).replaceWith(textInput);

    textInput.trigger("focus")
})

$(".text-area").on("blur", "textarea", function () {
    var text = $(this).val();

    var blurText = $("<p>")
    .text(text)
    .removeClass("form-control")
    .addClass("w-100 h-100")

    $(this).replaceWith(blurText)
})