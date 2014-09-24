var page = 0;
var landing = 0;
var coder = 1;
var designer = 2;
var yoyoer = 3;

$(document).ready(function() {
	update();

	$('#coder').hover(function() {
		$(this).animate({color: '#737373'}, 250);
	}, function() {
		if(page == coder)
			$(this).animate({color: '#03c8fa'}, 250);
		else
			$(this).animate({color: '#2e4259'}, 250);
	});

	$('#designer').hover(function() {
		$(this).animate({color: '#737373'}, 250);
	}, function() {
		if(page == designer)
			$(this).animate({color: '#03c8fa'}, 250);
		else
			$(this).animate({color: '#2e4259'}, 250);
	});

	$('#yoyoer').hover(function() {
		$(this).animate({color: '#737373'}, 250);
	}, function() {
		if(page == yoyoer)
			$(this).animate({color: '#03c8fa'}, 250);
		else
			$(this).animate({color: '#2e4259'}, 250);
	});

	$('#coder').click(function() {
		if(page != coder) {
			page = coder;
			update();
			$(this).animate({color: '#03c8fa'}, 250);
			$('#designer').animate({color: '#2e4259'}, 250);
			$('#yoyoer').animate({color: '#2e4259'}, 250);
			// $('h2 span').css('color', '#737373');
			// $(this).css('color', '#03c8fa');
		}
	});

	$('#designer').click(function() {
		if(page != designer) {
			page = designer;
			update();
			$(this).animate({color: '#03c8fa'}, 250);
			$('#coder').animate({color: '#2e4259'}, 250);
			$('#yoyoer').animate({color: '#2e4259'}, 250);
		}
	});

	$('#yoyoer').click(function() {
		if(page != yoyoer) {
			page = yoyoer;
			update();
			$(this).animate({color: '#03c8fa'}, 250);
			$('#coder').animate({color: '#2e4259'}, 250);
			$('#designer').animate({color: '#2e4259'}, 250);
		}
	});
});

function update() {
	var newHtml = updateHtml();
	$('.content').html(newHtml);
}

function updateHtml() {
	var html = '';
	switch(page) {
		case coder:
			html += '<p>';
			html += 'I didn&#39t grow up thinking that I would become a software developer. Like many others in my first grade class, I too, aspired to become Batman. I started to dwell in my basement, stay up late into the night, and wear an obscene amount of black. But after puberty hit, I came to the sad realization that beating criminals to a pulp just wasn&#39t what I was cut out for. But I couldn&#39t let all these bat-like qualities go to waste, so I made most logical decision I could and became a programmer. Anyways, here are my projects:';
			html += '</p>';

			break;
	}
	return html;
}