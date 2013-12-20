var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};

$(function(){
	
	function loadBugs() {
		var bugs = $('#bugs ul');
		
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/bapp_retrop/server/bugs.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					bugs.append('<li>'+'De : '+'<b>'+item.pseudo+'</b>');
					bugs.append('Sujet : '+item.titre_com);
					bugs.append('<br/>'+'Date : '+item.datefr);
					bugs.append('<br/>'+'Commentaire : '+item.commentaire)
				});
			},
			error: function(data) {
				bugs.append('<li>There was an error loading the bugs');
				alert('fuuuuuuuuck');
			}
		});
	}

$('#add-bug form').submit(function(){
                var postData = $(this).serialize();

                $.ajax({
                        type: 'POST',
                        data: postData,
                        url: 'http://www.argosapps.fr/bapp_retrop/server/add-bug.php',
                        success: function(data){
                                //do your thing
                                console.log('Bug added!');
                        },
                        error: function(){
                                //do your thing
                                console.log('There was an error');
                        }
                });

                return false;
        });

	
	loadBugs();
	
});