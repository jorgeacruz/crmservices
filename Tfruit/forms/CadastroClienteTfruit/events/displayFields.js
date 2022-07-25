function displayFields(form,customHTML){
	
	function displayFields(form,customHTML){

	    var user = getValue("WKUser");
	    var atv = getValue("WKNumState");
	    var processo = getValue("WKNumProces");

	    form.setValue("SOLICITANTE", user);
	    form.setValue("ATIVIDADE", atv);
	    form.setValue("NUMPROCESSO", processo);


	}
}