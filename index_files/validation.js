var domain = window.location.hostname;
var already = {
    startFilling: false,
    mistakeFilling: false,
    successFilling: false
};

var feed = {
	submit: function(e, elem) {
		
		var form = $(elem);

		var phone = form.find('[name=phone]').val();
		
		$('.errorMessage').remove();
		
		var rephone = /^[0-9\-\+\(\) ]*$/i;

		if(!phone.length || phone.length < 5){
			e.preventDefault();
			return feed.errorMessage(form.find('[name=phone]'), 'Вы не заполнили поле "Телефон"');
		}
		
		if(!rephone.test(phone)){
			e.preventDefault();
			return feed.errorMessage(form.find('[name=phone]'), 'Неверно заполнено поле "Телефон"');
		}

        feed.reachGoal("successFilling");
	},
	errorMessage: function(elem, msg) {
		$('<div class="errorMessage">' + msg + '</div>').appendTo('body').css({
			'left': $(elem).offset().left,
			'top': $(elem).offset().top + 30
		});

        feed.reachGoal("mistakeFilling");

		return false;
	},
    reachGoal: function(goal) {
        try {
            var params = {};
            params[domain] = goal;

            if(already[goal] != true) {
                yaCounter22765945.reachGoal("formFilling", params);
                already[goal] = true;
            }
        } catch(e) {}
    }
};

$(document).ready(function(){
	$('.orderformcdn').on('submit', function(e){
		feed.submit(e, this);
	});

	$('input[type="text"]').on('focus', function(){
		$('.errorMessage').remove();
        feed.reachGoal("startFilling");
	});
});