function fitToWindow(img) {
	img.height($(window).height() - 16)

	if (img.width() > $(window).width() - 16)
		img.width($(window).width() - 16)
}

var timeoutId = null
var paused = false

cycle = function() {
	$.ajax({
		url: document.URL,
		success: function(data) {
			var oldImg = $('img')
			oldImg.fadeOut(10*1000)
			setTimeout(function() {
				var newImg = $('<img>')
				newImg.attr('src', data)
				setTimeout(function() {
					fitToWindow(newImg)
					newImg.hide()
					oldImg.replaceWith(newImg)
					console.log(data)
					$('img').fadeIn(10*1000)
					if (!paused)
						timeoutId = setTimeout(function() { cycle() }, 40*1000)
				}, 1000)        // wait for image load
			}, 10*1000 + 10)   // wait for fadeout
		}
	})
}

$(document).click(function() {
	paused = !paused
	console.log("paused = " + paused)

	if (paused) {
		$('#pause').show()
		clearTimeout(timeoutId)
	}
	else {
		$('#pause').hide()
		cycle()
	}
})

$(document).ready(function() {
	cycle()
});
