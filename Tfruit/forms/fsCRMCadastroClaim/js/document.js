$(document).ready(function () {
	
	var atv = $("#ATIVIDADE").val();
	
	if( atv == "0"){
	
		//OCULTANDO CABEÇALHO E BREADCRUMP DO FORM
		window.parent.$("#breadcrumb").hide();
		window.parent.$("#textActivity").hide();
		window.parent.$(".workflow-collapse-tabs-static").hide();
		setTimeout(function(){

			var bd = $("form").parent().parent();
			$(bd).prop("style","");
	
		},250);

		//AJUSTANDO AS CORES DO BOTÃO ENVIAR
		window.parent.$("a.topBtn.btn.btn-primary").prop("style","background-color: #77B969 !important");
		window.parent.$('button[data-toggle]').prop('style','background-color: #77B969 !important');
		window.parent.$('button[data-send]').prop('style','background-color: #77B969 !important');
				
		//EXTENDENDO BG
		const x = frameElement;
		$(x).prop('style','padding-left: 10px !important; padding-right: 35px !important; top: 0px !important;');
	
	};	
	
	var dataAtual = new Date().toLocaleDateString();
		
	$("#DT_CADASTRO").val( dataAtual );

	var dsCadastroModoPagamento = DatasetFactory.getDataset("dsCadastroModoPagamento", null, null, null);

    for(var i=0; i<dsCadastroModoPagamento.values.length; i++) {
        var modoPagamento =  dsCadastroModoPagamento.values[i]["modoPagamento"];
        
        $("#modoPagamento").append('<option value="'+modoPagamento+'">'+modoPagamento+'</option>');
    };

						
});


/* Inicio tabelas pai X filho */

function childAdd(){
	var row = wdkAddChild("TABPASSAGEIROS");
	
	return row;
}

function fnCustomDelete(oElement){
	fnWdkRemoveChild(oElement);
}
/* Fim tabelas pai X filho */


	
	
	