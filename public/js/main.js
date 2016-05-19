require.config({
	shim: {
		underscore: {
			exports: '_'
		},
	},
	paths: {
		jquery: '../vendor/jquery/dist/jquery',
		underscore: '../vendor/underscore/underscore'
	}
});

require(['jquery'], function ($) {
	console.log('Cookie: ', getCookie('token'))
	
	$.ajax({ 
		url: '/user/me',
		headers : {
			authorization : 'Bearer ' + getCookie('token')
		},
		success: function (result) {
			console.log('SUCCESS: ', result)
		},
		error: function (result) {
			console.log('error: ', result)
		}
	});

});

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length,c.length);
		}
	}
	return "";
}