var page = 1;
var landing = 0;
var coder = 1;
var designer = 2;
var yoyoer = 3;

$(document).ready(function() {
	update();

	$('#name').hover(function() {
		$(this).animate({color: '#737373'}, 250);
	}, function() {
		$(this).animate({color: '#2e4259'}, 250);
	});

	$('#name').click(function() {
		if(page != landing) {
			page = landing;
			update();
			$('#coder').animate({color: '#2e4259'}, 250);
			$('#designer').animate({color: '#2e4259'}, 250);
			$('#yoyoer').animate({color: '#2e4259'}, 250);
			// $('h2 span').css('color', '#737373');
			// $(this).css('color', '#03c8fa');
		}
	});	

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
	$('.content').fadeOut(250, function() {
		var newHtml = updateHtml();
		$('.content').css('display', 'none');
		$('.content').html(newHtml);
		$('.content').fadeIn(250);
	});
}

function updateHtml() {
	var html = '';
	switch(page) {
		 case landing:
		 	html += '';
		 	break;

		case coder:
			html += '<p>';
			html += 'I didn&#39t grow up thinking that I would become a software developer. Like many others in my first grade class, I too, aspired to become Batman. I started to dwell in my basement, stay up late into the night, and wear an obscene amount of black. But after puberty hit, I came to the sad realization that beating criminals to a pulp just wasn&#39t what I was cut out for. But I couldn&#39t let all these bat-like qualities go to waste, so I made most logical decision I could and became a programmer. Anyways, here are my projects:';
			html += '</p>';
			html += '<h2 class="break"><span>PROJECTS</span></h2>';
			html += "<div class='pure-g'>";
			html += "<figure class='projectPic pure-u-lg-1-2 pure-u-md-1-2 pure-u-sm-1-1'>";
			html += 	"<img src='Assets/Images/AmishHero.png'></img>";
			html += '<figcaption>';
			html += "<a href='http://amishhero.com' target='_blank'><div class='projectButton'></div>";
			html += 	"<h3>AMISH<br>HARVEST<br>HERO</h3></a>";
			html += '</figcaption>';
			html += '</figure>';
			html += "<figure class='projectPic pure-u-lg-1-2 pure-u-md-1-2 pure-u-sm-1-1'>";
			html += 	"<img src='Assets/Images/PaletteTown.png'></img>";
			html += '<figcaption>';
			html += "<a href='http://palette.town' target='_blank'><div class='projectButton'></div>";
			html += 	"<h3>PALETTE<br>TOWN</h3>";
			html += '</figcaption>';
			html += '</figure>';
			html += '</div>';
			html += "<div class='pure-g'>";
			html += "<figure class='projectPic pure-u-lg-1-2 pure-u-md-1-2 pure-u-sm-1-1'>";
			html += 	"<img src='Assets/Images/YTWall.png'></img>";
			html += '<figcaption>';
			html += "<a href='http://ytwall.com' target='_blank'><div class='projectButton'></div>";
			html += 	"<h3>YT WALL</h3></a>";
			html += '</figcaption>';
			html += '</figure>';
			html += '</div>';
			break;
		case designer:
			html += '<p>There&#39s a story I like to refer to when people ask me why I wanted to get into design. It&#39s called The Ugly Barnacle. Once, there was an ugly barnacle. He was so ugly that everyone died. My goal is to get rid of the ugly barnacles in products, because sometimes they&#39re so ugly that everyone dies, and I don&#39t want that.</p>';
			break;
		case yoyoer:
			html += '<p>Yoyos are stupid and I hate them.</p>';
			break;
	}
	return html;
}