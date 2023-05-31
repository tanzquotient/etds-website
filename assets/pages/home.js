jQuery( document ).ready(function( $ ) {
	/*** 3D Gallery *********/
	// new CBPGridGallery(document.getElementById('grid-gallery'));
	new CBPFWTabs(document.getElementById('tabs-ui'));

	/* Overlay */
	if (Modernizr.touch) {
		// show the close overlay button
		$(".close-overlay").removeClass("hidden");
		// handle the adding of hover class when clicked
		$(".img").click(function (e) {
			if (!$(this).hasClass("hover")) {
				$(this).addClass("hover");
			}
		});
		// handle the closing of the overlay
		$(".close-overlay").click(function (e) {
			e.preventDefault();
			e.stopPropagation();
			if ($(this).closest(".img").hasClass("hover")) {
				$(this).closest(".img").removeClass("hover");
			}
		});
	} else {
		// handle the mouseenter functionality
		$(".img").mouseenter(function () {
			$(this).addClass("hover");
		})
		// handle the mouseleave functionality
			.mouseleave(function () {
				$(this).removeClass("hover");
			});
	}

	/** Registration Form **/
	$("#submit_btn").click(function () {

		var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

		var sv_name = document.getElementById("sv-name").value;
		var sv_team = document.getElementById("sv-team").value;
		var sv_email = document.getElementById("sv-email").value;

		var proceed = true;


		if (sv_name === "") {
			var error1 = '<div class="enter-name col-lg-3 align-center"> Enter the name </div>';
			jQuery("#result").hide().html(error1).fadeIn(500);
			proceed = false;
			return false;
		}

		if (sv_team === "") {
			var error2 = '<div class="enter-team col-lg-3 align-center"> Enter the team </div>';
			jQuery("#result").hide().html(error1).fadeIn(500);
			proceed = false;
			return false;
		}

		if (sv_team === "") {
			var error3 = '<div class="enter-email col-lg-3 align-center"> Enter the email </div>';
			jQuery("#result").hide().html(error2).fadeIn(500);
			proceed = false;

		} else if (!filter.test(sv_email)) {
			var invalid = '<div class="invalid-email col-lg-3 align-center"> Invalid Email </div>';
			jQuery("#result").hide().html(invalid).fadeIn(500);
			proceed = false;

		}

		if (proceed) //everything looks good! proceed...
		{

			//data to be sent to server
			var post_data = {
				'userName': sv_name,
				'userType': user_type,
				'userEmail': sv_email,

			};

			//Ajax post data to server
			jQuery.post('contact_me.php', post_data, function (response) {
				//load json data from server and output message
				if (response.type === 'error') {
					var output = '<div class="error col-lg-3 align-center">' + response.text + '</div>';
				} else {
					var output = '<div class="success col-lg-3 align-center">' + response.text + '</div>';
					//reset values in all input fields
				}
				jQuery("#result").hide().html(output).fadeIn(500);

			}, 'json');
		}

		return false;

	});

	/** Subscribe JS **/
	$("#notifyMe").notifyMe(); // Activate notifyMe plugin on a '#notifyMe' element


	/*** Overlay*********/
	$('.md-overlay').click(function (e) {
		$("#modal-10").removeClass("md-show");
		$("#modal-11").removeClass("md-show");
	});

	/** Placeholder JS call **/
	$('input[type=text], textarea').placeholder();

	/** Social button descriptions  **/
	var blank = $("#social-description").html();
	$(".social-buttons li").hover(
		function () {
			$("#social-description").html($(this).find("p").html());
		}, function () {
			$("#social-description").html(blank);
		}
	);
});
