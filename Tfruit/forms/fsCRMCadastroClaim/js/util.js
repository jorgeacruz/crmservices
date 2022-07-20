
function validarCnpj(cnpj) {
	
	cnpj = cnpj.value.replace(/[^\d]+/g,'');
	var invalido = false;

	if(cnpj == '' || cnpj == null) {
		invalido = true;
	} else {
		// Valida DVs
		//TAMANHO "SOMENTE NÚMEROS"
		var tamanho = cnpj.length - 2;

		//NUMEROS A ESQUERDA DEPOIS DO "-" 121858650001
		var numeros = cnpj.substring(0,tamanho);

		//NUMERO A DIREITA DEPOIS DO "-" EX.: 36
		var digitos = cnpj.substring(tamanho);
		
		var soma = 0;
		var pos = tamanho - 7;
		
		for (var i = tamanho; i >= 1; i--) {
			
			soma += numeros.charAt(tamanho - i) * pos--;
			
			if (pos < 2){
				pos = 9;
			};		
		};
		
		var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		
		if (resultado != digitos.charAt(0)){
			invalido = true;
			$("#CNPJ").focus();
		};
		
		tamanho = tamanho + 1;
		numeros = cnpj.substring(0,tamanho);
		soma = 0;
		pos = tamanho - 7;

		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2){
				pos = 9;
			};			
		};

		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		
		if (resultado != digitos.charAt(1)){
			invalido = true;
			$("#CNPJ").focus();
		} else { 
			invalido = false;
		};
	
	};

	if ( invalido ){//CNPJ INVÁLIDO, CRITICAR
		
		alertCnpj();
		
	} else {//CNPJ VÁLIDO, CONSULTAR SE JÁ EXITE...
		
		// verificaProdutor($("#CNPJ").val(),2);	
		verificaProdutor();	
	};
		
};


function alertCnpj(){
			
	const Toast = Swal.mixin({
		toast: true,
		position: 'center',
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
			// toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	});	  
	Toast.fire({
		icon: 'error',
		title: 'CNPJ Inválido!'
	});
};
// function verificaProdutor(cnpj, campo){
function verificaProdutor(){

	var cnpj = $("#CNPJ").val();
	
	var c1 = DatasetFactory.createConstraint("CNPJ", cnpj, cnpj, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("dsTF00001", null, constraints, null);

	var row = dataset.values;
	var count = dataset.values.length;

	if (count > 0){ //ENCONTREI PRODUTOR CADASTRADO
				
		var metadataId = new Array();

		for (var i = 0; i < count; i++){

			var rep = row[i];

			var metadata = rep["metadata#id"];

			metadataId.push(metadata);
			
		};
		
		var metadataIdMax = Math.max.apply(null, metadataId);	

		var c3 = DatasetFactory.createConstraint("metadata#id", metadataIdMax, metadataIdMax, ConstraintType.MUST);
		var constraintsId = new Array(c3);
		var datasetId = DatasetFactory.getDataset("dsTF00001", null, constraintsId, null);

		var rowId = datasetId.values;
		var countId = datasetId.values.length;

		for (var j = 0; j < countId; j++){

			var repId = rowId[j];
			
			//CAMPOS PADRÕES CDN HIDDEN
			$("#ID_PASTA_PRODUTOR").val( repId['ID_PASTA_PRODUTOR']);
			$("#MONITORA_DOC").val( repId['MONITORA_DOC']);

			//CAMPOS DO FORM
			$("#CNPJ").val( repId['CNPJ'] );
			$("#RAZAO").val( repId['RAZAO'] ) ;
			$("#FANTASIA").val( repId['FANTASIA'] );
			$("#ATIVO_TXT").val( repId['ATIVO_TXT'] );
			if( $("#ATIVO_TXT").val() == "A" ){
				FLUIGC.switcher.setTrue('#ATIVO');
			};
			if ( $("#ATIVO_TXT").val() == "I" ){
				FLUIGC.switcher.setFalse('#ATIVO');
			};
			$("#CEP").val( repId['CEP'] );
			$("#ENDERECO").val( repId['ENDERECO'] );
			$("#NUMERO").val( repId['NUMERO'] );
			$("#BAIRRO").val( repId['BAIRRO'] );
			$("#COMPLEMENTO").val( repId['COMPLEMENTO'] );
			$("#CIDADE").val( repId['CIDADE'] );
			$("#UF").val( repId['UF'] );
			$("#PAIS").val( repId['PAIS'] );
			$("#NOME_CONTATO").val( repId['NOME_CONTATO'] );
			$("#EMAIL").val( repId['EMAIL'] );
			$("#TELEFONE1").val( repId['TELEFONE1']);
			$("#TELEFONE2").val( repId['TELEFONE2'] );
			setTimeout(function(){
				window["FORMA_CONTATO"].setValue( repId['FORMA_CONTATO'] )
			}, 250);			
			$("#modoPagamento").val(repId['modoPagamento']);
			$("#PRAZO").val( repId['PRAZO'] );
			$("#COMISSAO").val( repId['COMISSAO'] );
			var marcas = repId['MARCAS'].split("\u0018");
			// CAMPO ZOOM MULT SELECT(setVlue's')
			setTimeout(function(){
				window["MARCAS"].setValues( marcas );
			}, 250);		
			$("#PAYMENTSTERMS").val( repId['PAYMENTSTERMS'] );
			$("#DOLAR_TEXTAREA").val( repId['DOLAR_TEXTAREA'] );
			$("#EURO_TEXTAREA").val( repId['EURO_TEXTAREA'] );
			var perfil = repId['PERFIL'];
			if ( perfil == "" || perfil == null || perfil == undefined){
				//VAZIO
			} else {

				$("#divNOTIFICA").show();

				setTimeout(function(){
					window["PERFIL"].setValue( perfil );	
				}, 250);
				
				$("#PERFIL_TXT").val( repId['PERFIL_TXT']);

				$("#NOTIFICA_EMAIL").val( repId['NOTIFICA_EMAIL']);
				if( $("#NOTIFICA_EMAIL").val() == "S" ){
					setTimeout(function(){
						FLUIGC.switcher.setTrue('#SEND_EMAIL');
					}, 250);					
				};
				if ( $("#NOTIFICA_EMAIL").val() == "N" ){
					setTimeout(function(){
						FLUIGC.switcher.setFalse('#SEND_EMAIL');
					}, 250);					
				};
				$("#NOTIFICA_WHATSAPP").val( repId['NOTIFICA_WHATSAPP']);
				if( $("#NOTIFICA_WHATSAPP").val() == "S" ){
					setTimeout(function(){
						FLUIGC.switcher.setTrue('#SEND_WHATSAPP');
					}, 350);
				};
				if ( $("#NOTIFICA_WHATSAPP").val() == "N" ){
					setTimeout(function(){
						FLUIGC.switcher.setFalse('#SEND_WHATSAPP');
					}, 450);
				};
				// console.log(repId['DIAS']);
				// setTimeout(function(){
				// 	$("#DIAS").val( repId['DIAS'] );
				// }, 550);
				
			};
						
		};
		
		console.log("metadataId(max): " + metadataIdMax);

		//TABELA PRODUTOS
		var c4 = DatasetFactory.createConstraint("tablename", "TAB_PRODUTOS_PRODUTOR" ,"TAB_PRODUTOS_PRODUTOR", ConstraintType.MUST);
		var constraintsFilhosProd = new Array(c3,c4);
		var datasetFilhosProd = DatasetFactory.getDataset("dsTF00001", null, constraintsFilhosProd, null);

		var rowProd = datasetFilhosProd.values;
		var countProd = datasetFilhosProd.values.length;

		for (var k = 0; k < countProd; k++){

			var repProd = rowProd[k];
			
			var seqProd = wdkAddChild('TAB_PRODUTOS_PRODUTOR');

			window["PRODUTOS___" + seqProd].setValue( repProd['PRODUTOS'] );	
							
			$("#PRODUTOS_TXT___" + seqProd ).val( repProd['PRODUTOS_TXT'])
		
		};

		//TABELA DOCUMENTOS
		var c5 = DatasetFactory.createConstraint("tablename", "TAB_DOCUMENTOS" ,"TAB_DOCUMENTOS", ConstraintType.MUST);
		var constraintsFilhosDoc = new Array(c3,c5);
		var datasetFilhosDoc = DatasetFactory.getDataset("dsTF00001", null, constraintsFilhosDoc, null);
		
		var rowDoc = datasetFilhosDoc.values;
		var countDoc = datasetFilhosDoc.values.length;

		for (var l = 0; l < countDoc; l++){

			var repDoc = rowDoc[l];

			var seqDoc = wdkAddChild('TAB_DOCUMENTOS');

			window["DOC_ZOOM___" + seqDoc].setValue( repDoc['DOC_ZOOM'] );
			$("#NOME_DOCUMENTO_TXT___" + seqDoc ).val( repDoc['NOME_DOCUMENTO_TXT']);
			$("#ANEXADO___" + seqDoc ).val( repDoc['ANEXADO']);
			$("#ID_DOCUMENTO___" + seqDoc ).val( repDoc['ID_DOCUMENTO']);
			$("#LABELFORM___" + seqDoc ).val( repDoc['LABELFORM']);
			$("#MONITORAR_VALIDADE_TXT___" + seqDoc ).val( repDoc['MONITORAR_VALIDADE_TXT']);
			var monitorar = $("#MONITORAR_VALIDADE_TXT___" + seqDoc ).val();
			if ( monitorar == "S"){
				
				FLUIGC.switcher.setTrue('#MONITORAR_VALIDADE___' + seqDoc);
				$("#EMISSAO___" + seqDoc ).val( repDoc['EMISSAO']);
				$("#VALIDADE___" + seqDoc ).val( repDoc['VALIDADE']);
				$("#EMISSAO___" + seqDoc).mask('00/00/0000');
				$("#VALIDADE___" + seqDoc).mask('00/00/0000');
								
			} else {
				
				FLUIGC.switcher.setFalse('#MONITORAR_VALIDADE___' + seqDoc);
				FLUIGC.calendar('#EMISSAO___' + seqDoc, {}).disable();
				FLUIGC.calendar('#VALIDADE___' + seqDoc, {}).disable();

			};
		
			$("#NOVO___" + seqDoc).hide();
			$("#VIEWDOC___" + seqDoc).show();
			$("#DELDOC___" + seqDoc).show();
			
		};
		
	} else { // NÃO ENCONTROU PRODUTOR

		console.log("...");
	};
	
};

$("#CEP").blur(function() {
	
	//Nova variável "cep" somente com dígitos.
	var cep = $(this).val().replace(/\D/g, '');

	//Verifica se campo cep possui valor informado.
	if (cep != "") {

		//Expressão regular para validar o CEP.
		var validacep = /^[0-9]{8}$/;

		//Valida o formato do CEP.
		if(validacep.test(cep)) {

			//Preenche os campos com "..." enquanto consulta webservice.
			$("#ENDERECO").val("...");
			$("#BAIRRO").val("...");
			$("#CIDADE").val("...");
			$("#UF").val("...");
			$("#IBGE").val("...");

			//Consulta o webservice viacep.com.br/
			$.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

				if (!("erro" in dados)) {
					//Atualiza os campos com os valores da consulta.
					$("#ENDERECO").val(dados.logradouro);
					$("#BAIRRO").val(dados.bairro);
					$("#CIDADE").val(dados.localidade);
					$("#UF").val(dados.uf);
					$("#IBGE").val(dados.ibge);
					$("#NUM").focus();
				} //end if.
				else {
					//CEP pesquisado não foi encontrado.
					limpa_formulário_cep();
					
					var msg = "CEP Não Encontrado!"
					cepAlert(msg);
				}
			});
		} //end if.
		else {
			//cep é inválido.
			limpa_formulário_cep();
			
			var msg = "CEP Inválido!"
			cepAlert(msg);
		}
	} //end if.
	else {
		//cep sem valor, limpa formulário.
		limpa_formulário_cep();
	}
});

function cepAlert(msg){

	const Toast = Swal.mixin({
		toast: true,
		position: 'center',
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
			// toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	});	  
	Toast.fire({
		icon: 'warning',
		title: msg
	});
};

function limpa_formulário_cep() {
	// Limpa valores do formulário de cep.
	$("#ENDERECO").val("");
	$("#BAIRRO").val("");
	$("#CIDADE").val("");
	$("#UF").val("");
	$("#IBGE").val("");
};

$('#NOVO_PRODUTOR').click(function (){

	var novo = $("#NOVO_PRODUTOR").is(':checked');

	if (novo){

		window["PRODUTOR"].clear();
		window["PRODUTOR"].disable(true);
		
		$(".cnpj").fadeIn(180);
		$("#CNPJ").val("");
		$(".razao").fadeIn(180);
		$(".fantasia").fadeIn(180);
		$(".ativo").fadeIn(180);

		//limpar campo zoom e todo o formulário

	} else {

		window["PRODUTOR"].disable(false);

		$(".cnpj").hide();
		$(".razao").hide();
		$(".fantasia").hide();
		$(".ativo").hide();

		//limpar todo formulário

	};

	
	
});
//FUNÇÕES CHECKBOX GLOBAIS DO FORM
function checkAtivo(){
	
	var ativo = FLUIGC.switcher.getState('#ATIVO');
	
	if( ativo ){
		$("#ATIVO_TXT").val("A");
	} else {
		$("#ATIVO_TXT").val("I");
	};

};
function checkMonitorar(obj){
	
	var seq = $(obj).attr("id").split("___")[1];

	var monitorar = FLUIGC.switcher.getState('#MONITORAR_VALIDADE___' + seq);
	
	if( monitorar ){ //MONITORAR DOCUMENTO
		
		//CAMPO OCULTO GLOBAL DO FORM
		$("#MONITORA_DOC").val("S");
		
		$("#MONITORAR_VALIDADE_TXT___" + seq).val("S");
				
		var dataEmissao = FLUIGC.calendar('#EMISSAO___' + seq, {
			pickDate: true,
			pickTime: false,
			useCurrent: false,
			maxDate: new Date()
		}).enable();
		var dataValidade = FLUIGC.calendar('#VALIDADE___' + seq, {
			pickDate: true,
			pickTime: false,
			useCurrent: false
		}).enable();

		$("#divNOTIFICA").fadeIn(180);

	} else { // NÃO MONITORAR DOCUMENTO

		$("#MONITORAR_VALIDADE_TXT___" + seq).val("N");
		
		var dataEmissao = FLUIGC.calendar('#EMISSAO___' + seq, {}).disable();
		$("#EMISSAO___" + seq).val('');
		var dataValidade = FLUIGC.calendar('#VALIDADE___' + seq, {}).disable();
		$("#VALIDADE___" + seq).val('');

		var monitora = false;
	
		// VERIFICANDO SE HA ALGUMA LINHA DA TABELA DE DOCUMENTOS MARCADA P MONITORAR: SE NÃO, OCULTAR A DIV "DADOS NOTIFICAÇÕES" E LIMPAR CAMPOS
		$("input[id^='DOCUMENTO___']").each(function(index, value){

			var seq = $(this).attr("id").split("___")[1];

			var monitoramento = $("#MONITORAR_VALIDADE_TXT___" + seq).val();
			
			if ( monitoramento == "S" ){

				monitora = true;				
			};           
		});
		if ( monitora == false ){

			$("#divNOTIFICA").hide();
			window["PERFIL"].clear();
			$("#PERFIL_TXT").val('')
			// $("#DIAS").val('');
			FLUIGC.switcher.setFalse('#SEND_EMAIL');
			FLUIGC.switcher.setFalse('#SEND_WHATSAPP');

			//CAMPO OCULTO GLOBAL DO FORM
			$("#MONITORA_DOC").val('N');
					
		};		

	};

};
function ajustaTelefone(){
	
	var whatsTxt = $("#TELEFONE1").val().replace(/[^0-9]/g,''); 

	$("#TELEFONE1_TXT").val(whatsTxt);
};

function checkSend(){
	
	var whats = FLUIGC.switcher.getState('#SEND_WHATSAPP');
	var email = FLUIGC.switcher.getState('#SEND_EMAIL');
	
	if( whats ){
		$("#NOTIFICA_WHATSAPP").val("S");
		
	} else {
		$("#NOTIFICA_WHATSAPP").val("N");
	};

	if( email ){
		$("#NOTIFICA_EMAIL").val("S");
	} else {
		$("#NOTIFICA_EMAIL").val("N");
	};

};

// var celular = "19981752508"
// window.open('https://api.whatsapp.com/send?phone=55'+celular+'&text=Existem%20%20%20RATS%20pendentes%20para%20sem%20lan%C3%A7ados!%20Favor%20deixar%20em%20dia.%20Obrigado');


function mouse(e){
	
	var valCampo = $(e).val();
	
	if(valCampo == "" || valCampo == null){
		return false;
	} else {
		$(e).prop("title", valCampo);
		return true;
	};
};

function addChild(tab){
	
	var rowCountDoc = $("#TABDOCUMENTOS > tbody").children().length -1;
	var cnpj = $("#CNPJ").val();
	var razao = $("#RAZAO").val();

	var vazio = false;
	var msg = "";
	
	if(rowCountDoc <= 0){
				
		if( cnpj == "" || cnpj == null || razao == "" || razao == null){
		
		vazio = true;
		msg += "CNPJ/Razão Social; ";

		};

	};
	if( rowCountDoc > 0) {
		
		$("input[id^='ANEXADO___']").each(function(index, value){
		
			var seq = $(this).attr("id").split("___")[1];

			var anexado = $("#ANEXADO___" + seq).val();
			
			if ( anexado == "N"){
				
				vazio = true;
				msg += "Anexar Documento"
			};

		});

	};
	
	if( vazio ){
		
		Swal.fire({
			icon: 'error',
			title: 'Campo(s) obrigatório(s)!',
			text: msg
		})

		return false;

	} else {

		var row = wdkAddChild(tab);
	
		FLUIGC.switcher.init('#MONITORAR_VALIDADE___' + row);

		var dataEmissao = FLUIGC.calendar('#EMISSAO___' + row, {}).disable();
		var dataValidade = FLUIGC.calendar('#VALIDADE___' + row, {
			minDate: new Date()
		}).disable();
					
		$("#EMISSAO___" + row).mask('00/00/0000');
		$("#VALIDADE___" + row).mask('00/00/0000');
	
		return row;

	};
	
};

// REMOVE UMA LINHA DA TABELA MODAL
function excluiDocumento(oElement){
	
	Swal.fire({
		title: 'Excluir o Item?',
		text:'Todo conteúdo será perdido!',
		showDenyButton: true,
		confirmButtonText: 'Excluir!',
		denyButtonText: `Cancelar!`,
		confirmButtonColor: '#cc3d3d',
		denyButtonColor: '#1eaad9',
	}).then((result) => {
  	
		if (result.isConfirmed) {
						
			var seq = $(oElement).attr("id").split("___")[1];
	    	var a = $("#ID_DOCUMENTO___" + seq).val();
			
			//REMOVE DOCUMENTO GED
			deleteDocument(a,1000);

			//REMOVE LINHA TABELA
			fnWdkRemoveChild(oElement);
			
  		};
	
	});

	return false;
};
