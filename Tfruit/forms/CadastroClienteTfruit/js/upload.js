/*--------------------------------*/
// TAXONOMIA GED:
// PASTA PAI = PRODUTORES(308 base local)(13200 Homolog)/
// PASTA FILHO = CNPJ+RAZÃO/
// PASTA NETO = NOME DOCUMENTO/
// ARQUIVOS "pdf"
// EX.: PRPDUTORES/13234567000136-RAZAO E CIA/GLOBALGAP/global produtor.pdf
/*--------------------------------*/

// FUNÇÃO QUE SIMULA UM CLICK NO INPUT TYPE FILE AO CLICAR NO CHECKBOX
function uploadClick(seq){
		
	$("#DOCUMENTO___" + seq).trigger('click');
	
};

// UPLOAD DOS DOCUMENTOS
function upload(obj){
		
	var seq = $(obj).attr("id").split("___")[1];
	
	// DEFININDO ID DA PASTA PAI NO GED "PRODUTORES/" (base local=308)(base Homolog-13200)
	var idPastaPai = 13200;
	
	// DEFININDO NOME DA PASTA PRODUTOR NO GED EX.: "PRODUTORES/13186756444534-RAZAOSOCIAL LTDA/"
	var cnpj = $('#CNPJ').val().replace(/[^\d]+/g,'');
	var razaoProdutor = $("#RAZAO").val();
	var nomePastaProdutor = cnpj + "-" + razaoProdutor;

	// TIPO DE DOCUMENTO QUE SERÁ O NOME DA PASTA DOCUMENTO EX.: "PRODUTORES/13186756444534-RAZAO TOTAL/NOTA FISCAL/..."
	var nomePastaDocumento = $("#NOME_DOCUMENTO_TXT___" + seq).val();
			
	$('input[name^=DOCUMENTO___' + seq + ']').fileupload({
	
		dataType: "json",

		done: function(e, data) {
			
			$.each(data.result.files, async function(index, file) {
									
				// CONSULTANDO SE A SUBPASTA COM O 'NOME DO PRODUTOR' EXISTE OU NÃO
				var idPastaProdutor = consultaPastaProdutorGed(nomePastaProdutor);
				
				if ( idPastaProdutor == null ){//NÃO ENCONTREI A PASTA PRODUTOR, VOU CRIAR...
					
					idPastaProdutor = await criarPastaProdutorGed(nomePastaProdutor ,idPastaPai);
				
				};

				//REGISTRANDO ID DA PASTA PRODUTOR NO CAMPO GLOBAL OCULTO DO FORM
				$("#ID_PASTA_PRODUTOR").val(idPastaProdutor);
				
				// CONSULTANDO SE A SUBPASTA COM O 'NOME/TIPO DE DOCUMENTO' EXISTE OU NÃO
				var idPastaDocumento = consultaPastaDocumentoGed(idPastaProdutor, nomePastaDocumento);
				
				if ( idPastaDocumento == null){ // NÃO ENCONTREI A PASTA DOCUMENTO, VOU CRIAR...
					
					// CRIA PASTA "NOME DO DOCUMENTO" 
					idPastaDocumento = await criarPastaDocumentoGED(nomePastaDocumento, idPastaProdutor );
					
				};				
				
				// CRIA DOCUMENTO "pdf"
				var idDocumentoPdf = await criarPdfGed(idPastaDocumento, file, seq);
								
				//ID DO DOCUMENTO "pdf" QUE FOI CRIADO NO GED
				$("#ID_DOCUMENTO___" + seq).val(idDocumentoPdf);

				// NOME DO DOCUMENT "pdf" P SER EXIBIDO NO FORM	
				$("#LABELFORM___" + seq ).val(file.name);		
				
			});
		}
	});

};

function consultaPastaProdutorGed(documentDescription) {
		
	documentDescription = documentDescription.split('-')[0];
	
	// CONSULTANDO SE EXITE PASTA COM O NOME DO PRODUTOR
	var c1 = DatasetFactory.createConstraint("deleted", false, false, ConstraintType.MUST);
	// NESSA CONSTRAINT PASSO  AS VARIAVEIS ENTRE '%' E "MUST.true" p ativar o 'Like'.
	var c2 = DatasetFactory.createConstraint("documentDescription", "%" + documentDescription +"%", "%" + documentDescription + "%", ConstraintType.MUST, true);
	
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("document",null,constraints,null);

	var row = dataset.values;
	var count = dataset.values.length;
	
	if ( count == 0 ){ //NÃO EXISTE, CRIAR A PASTA 		
		
		return null		
		
	} else { //EXISTE,  PEGAR O ID DA PASTA DO PRODUTOR CADASTRADA NO GED
		
		var rep = row[0];
		
		var idPastaProdutor = rep['documentPK.documentId'];
		
		return idPastaProdutor;
		
	};
	
};

function consultaPastaDocumentoGed(parentDocumentId, documentDescription){

	// CONSULTANDO SE EXITE PASTA COM O NOME DO PRODUTOR
	var c3 = DatasetFactory.createConstraint("deleted", false, false, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("parentDocumentId", parentDocumentId, parentDocumentId, ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("documentDescription", documentDescription, documentDescription, ConstraintType.MUST);
	
	var constraints = new Array(c3,c4,c5);
	var datasetDoc = DatasetFactory.getDataset("document",null,constraints,null);

	var rowDoc = datasetDoc.values;
	var countDoc = datasetDoc.values.length;

	if ( countDoc == 0 ){ //NÃO EXISTE, CRIAR A PASTA 		
		
		return null;		
		
	} else { //EXISTE,  PEGAR O ID DA PASTA "DOCUMENTO" CADASTRADA NO GED
		
		for (var i = 0; i < countDoc; i++ ){
				
			var repDoc = rowDoc[i];

			var idPastaDocumento = repDoc['documentPK.documentId'];
			
			return idPastaDocumento;
		};		

	};
};


async function criarPastaProdutorGed(nomePastaProdutor ,idPastaPai){
	
	const idPastaProdutorCriada = await new Promise((resolve, reject) => {
		
		$.ajax({
			url: parent.WCMAPI.getServerURL() + "/api/public/ecm/document/createFolder",
			method: "POST",
			async: true,
			contentType: "application/json",
			data: JSON.stringify({
				description: nomePastaProdutor,
				parentId: idPastaPai
			})
		})
		.success(result => {
			resolve(result.content.id);
		})
		.fail(result => {
			resolve(0);
		});
	});
	
	return idPastaProdutorCriada
	
};

async function criarPastaDocumentoGED(nomePastaDocumento, idPastaProdutor ) {
			
	const idPastaDocumentoCriada = await new Promise((resolve, reject) => {
		$.ajax({
			url: parent.WCMAPI.getServerURL() + "/api/public/ecm/document/createFolder",
			method: "POST",
			async: true,
			contentType: "application/json",
			data: JSON.stringify({
				description: nomePastaDocumento,
				parentId: idPastaProdutor 
			})
		})
		.success(result => {
			resolve(result.content.id);
		})
		.fail(result => {
			resolve(0);
		});
	});
	
	return idPastaDocumentoCriada;

};
  
async function criarPdfGed(idPastaDocumento, anexo, seq) {
	
	const documentoCriado = await new Promise((resolve, reject) => {
		$.ajax({
		url: parent.WCMAPI.getServerURL() + "/api/public/ecm/document/createDocument",
		method: "POST",
		async: true,
		contentType: "application/json",
		data: JSON.stringify({
			description: anexo.name,
		 	parentId: idPastaDocumento,
		 	attachments: [
			{
			  fileName: anexo.name
			}
		  	]
		})
		})
		.success(result => {
			resolve(result.content.id);
			
			statusGED("1");	
			ajustaBtn(seq, "1");

		})
		.fail(result => {
			resolve(0);
		});
	});
  
	return documentoCriado;
};

// VISUALIZAR OS DOCUMENTOS
function view(obj){
	
	var seqView = $(obj).attr("id").split("___")[1];
	
	var a = $("#ID_DOCUMENTO___" + seqView).val();
		
	openDocument(a,1000);

};

function openDocument(docId, version) {

    var urlFtl = parent.WCMAPI.serverUR + "/ecm_documentview/documentView.ftl";
	
    parent.ECM.documentView = {};
    
	var cfg = {
        url: urlFtl,
        maximized: true,
        title: "Anexo",
        callBack: function () {

            parent.ECM.documentView.getDocument(docId, version);
        },
    
		customButtons: []
    };

    parent.ECM.documentView.panel = parent.WCMC.panel(cfg);
   
};
  
// EXCLUIR DOCUMENTOS
function del(obj){
	
	var seqDell = $(obj).attr("id").split("___")[1];
	
	var a = $("#ID_DOCUMENTO___" + seqDell).val();

	deleteDocument(a,1000);

	ajustaBtn(seqDell,"0");		
		
};

function deleteDocument(idDoc) {
	
	$.ajax({
		async : false,
		type : "POST",
		contentType : "application/json",
		url : '/api/public/ecm/document/remove',
		data : JSON.stringify({
			"id" : idDoc,
		}),
		error : function(e) {
			
			var attachments = parent.WKFViewAttachment.attachmentsDocs;
			var aindaEstaAnexo = false;
			
			if (aindaEstaAnexo == false) {
				
			}

		},
		success : function(data) {
			statusGED("0");								
		},		
	});		
};

function ajustaBtn(seq, stat){
	
	if( stat == "1"){//ANEXANDO
		$("#VIEWDOC___" + seq).fadeIn(180);
		$("#DELDOC___" + seq).fadeIn(180);
		$("#ANEXADO___" + seq).val("S");
		
	};
	if( stat == "0"){//EXCLUIDO
		
		$("#LABELFORM___" + seq).val("");
		$("#VIEWDOC___" + seq).hide();
		$("#DELDOC___" + seq).hide();
		$("#EMISSAO___" + seq).val("");
		$("#VALIDADE___" + seq).val("");
		$("#ANEXADO___" + seq).val("N");

		uploadClick(seq);
	};
	
};

function statusGED (stat){
	
	var msg = "";

	if(stat == "1"){//ANEXANDO
		msg = "Anexado"
	};
	if(stat == "0"){//EXCLUINDO
		msg = "Excluido"
	};

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
		icon: 'success',
		title: 'Documento ' + msg + ' com Sucesso!'
	});
};





		




  


