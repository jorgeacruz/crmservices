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



/* Tabela Pai - Filho (Destinos) */
function DESTINOS(){ var row = wdkAddChild("TAB_DESTINOS"); return row; }
function DESTINOSDelete(oElement){ fnWdkRemoveChild(oElement); }

/* Tabela Pai - Filho (DADOS CONTATO) */
function DADOSCONTATO(){ var row = wdkAddChild("TAB-DADOSCLIENTE"); return row; }
function DADOSCONTATODelete(oElement){ fnWdkRemoveChild(oElement); }

/* Tabela Pai - Filho (PRE ALERTAS) */
function PREALERTAS(){ var row = wdkAddChild("TAB-PREALERTAS"); return row; }
function PREALERTASDelete(oElement){ fnWdkRemoveChild(oElement); }


	
	
	