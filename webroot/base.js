(function ($) {
	
	'use strict';


	//Form submission

	function submit() {
		$.post('qr_proc.php', {
			'qr': $('[name="qr"]').val(),
			'submit': 1
		}, response);
		return false;
	}

	function response(data) {
		if (data === '1') {
			var score = localStorage.getItem('score');
			if (score) {
				localStorage.setItem('score', score + 1);
			} else {
				localStorage.setItem('score', 1);
			}
		}
	}

	$('#qr_form').submit(submit);


	//QR conversion

	window.URL = window.URL || window.webkitURL;

	function showDialog() {
		$('#load_qr').click();
	}

	function start() {
		var files = this.files;

		if (!files) {
			alert('We\'re sorry but file reader not supported!');
			return;
		}

		if (!files.length) {
			return;
		}

		var imageURL = URL.createObjectURL(files[0]);

		qrcode.decode(imageURL);
	}

	function converted(qr) {
		$('#qr').val(qr);
	}

	$('#get_qr').click(showDialog);
	$('#load_qr').on('change', start);
	qrcode.callback = converted;

})(jQuery);