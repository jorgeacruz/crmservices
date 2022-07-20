function setSelectedZoomItem(selectedItem) {
	
	if (selectedItem.inputId == "DOC_ZOOM___"!="-1") {

		var seq = selectedItem.inputId.split("___")[1];			
		
		//OCULTAR O BOTÃO/LINK DE CADASTRAR "NOVO"
        $("#NOVO___" + seq).hide();
		
		//REGISTRANDO O NOME QUE SERÁ A DESCRIÇÃO DA PASTA PAI NO GED
		$("#NOME_DOCUMENTO_TXT___" + seq).val(selectedItem["DOCUMENTO"]);

		// FUNÇÃO QUE SIMULA UM CLICK NO INPUT TYPE FILE
		uploadClick( seq );
		
	};
	// if (selectedItem.inputId.indexOf("PRODUTOR") != -1) {

	//  	var cnpj = selectedItem['CNPJ'];
	 	
	// 	verificaProdutor(cnpj,1);

	// 	// exibir os campos do form..
	// 	$(".cnpj").fadeIn(180);
	// 	$("#CNPJ").attr('readonly', true);
	// 	$(".razao").fadeIn(180);
	// 	$(".fantasia").fadeIn(180);
	// 	$(".ativo").fadeIn(180);

		
	// };
	if (selectedItem.inputId.indexOf("PERFIL") != -1) {

		$("#PERFIL_TXT").val(selectedItem['VALOR']);
		
	};

};

function removedZoomItem(removedItem) {
	
	if (removedItem.inputId.indexOf("DOC_ZOOM___")!="-1"){
	
		var seq = removedItem.inputId.split("___")[1];
		
		//EXIBINDO O BOTÃO/LINK CADASTRAR "NOVO"
		$("#NOVO___" + seq).fadeIn(180);
        		
		var a = $("#ID_DOCUMENTO___" + seq).val();
		deleteDocument(a,1000);

		$("#LABELFORM___" + seq).val("");
		$("#VIEWDOC___" + seq).hide();
		$("#DELDOC___" + seq).hide();
		$("#ANEXADO___"+ seq).val("N");

		//LIMPANDO CAMPO COM O NOME QUE SERIA UTILIZADO P DESCRIÇÃO DA PASTA PAI NO GED
		$("#NOME_DOC_TXT___" + seq).val('');
		
		//$("#ID_PASTA_CERTIFICADO___" + seq).val("");
			
	};
	// if (removedItem.inputId == "PRODUTOR") {
		
	// 	// exibir os campos do form..
	// 	$(".cnpj").hide();
	// 	$("#CNPJ").attr('readonly', false);
	// 	$(".razao").hide();
	// 	$(".fantasia").hide();
	// 	$(".ativo").hide();		
		
	// };
	if (removedItem.inputId == "PERFIL") {
		
		$("#PERFIL_TXT").val("");
		
	};
			
};


