
$(document).ready(function(){
	
	var dataNascimento = FLUIGC.calendar('#MEUCALENDARIO');

	$("#CEP").blur(function(){
		
		console.log('Entrei no viacep');
		
	    $.getJSON("//viacep.com.br/ws/" + $("#CEP").val() +"/json/", function(dados){
	    $("#LOGRADOURO").val(dados.logradouro);
	    $("#BAIRRO").val(dados.bairro);
	    $("#CIDADE").val(dados.localidade);
	    $("#ESTADO").val(dados.uf);
	    });
	    
	});
   

});


