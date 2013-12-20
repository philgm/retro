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
	
	function loadComs() {
		var coms = $('#coms ul');
		
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/retro/server/coms.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					coms.append('<li>'+'De : '+'<b>'+item.pseudo+'</b>');
					coms.append('Sujet : '+item.titre_com);
					coms.append('<br/>'+'Date : '+item.datefr);
					coms.append('<br/>'+'Commentaire : '+item.commentaire)
				});
			},
			error: function(data) {
				coms.append('<li>Erreur pendant le chargement des coms');
				alert('fuuuuuuuuck');
			}
		});
	}

$('#add-com form').submit(function(){
                var postData = $(this).serialize();

                $.ajax({
                        type: 'POST',
                        data: postData,
                        url: 'http://www.argosapps.fr/retro/server/add-com.php',
                        success: function(data){
                                //do your thing
                                console.log('Com ajouté !');
                        },
                        error: function(){
                                //do your thing
                                console.log('There was an error');
                        }
                });

                return false;
        });

	
	loadComs();
	
});