var beforeSendValidate = function(numState,nextState){
    
    var atv = $("#ATIVIDADE").val();  	//ATIVIDADE ATUAL
        
    if(  atv == 0 || atv == 4 ){

        var vazio = false;
        var msg = "";

        var cnpj = $("#CNPJ").val();
        var razao = $("#RAZAO").val();
        var fantasia = $("#FANTASIA").val();
        var cep = $("#CEP").val();
        var endereco = $("#ENDERECO").val();
        var num = $("#NUMERO").val();
        var bairro = $("#BAIRRO").val();
        var cidade = $("#CIDADE").val();
        var uf = $("#UF").val();
        var pais = $("#PAIS").val();
        var contato = $("#NOME_CONTATO").val();
        var email = $("#EMAIL").val();
        var tel1 = $("#TELEFONE1").val();
        var tel2 = $("#TELEFONE2").val();
        var forma = $("#FORMA_CONTATO").val();
        var modoPgt = $("#modoPagamento").val();
        var prazo = $("#PRAZO").val();
        var comissao = $("#COMISSAO").val();
        var marcas = $("#MARCAS").val();        
        var payment = $("#PAYMENTSTERMS").val();
        var rowCountProd = $("#TAB_PRODUTOS_PRODUTOR > tbody").children().length -1;
        var bancoDolar = $("#DOLAR_TEXTAREA").val(); 
        var bancoEuro = $("#EURO_TEXTAREA").val();
        var rowCountDoc = $("#TABDOCUMENTOS > tbody").children().length -1;
        

        if (cnpj == "" || cnpj == null){
            vazio = true;
            msg = "CNPJ; ";
        };
        if (razao == "" || razao == null){
            vazio = true;
            msg += "Razão Social; ";
        };
        if (fantasia == "" || fantasia == null){
            vazio = true;
            msg += "Nome Fantasia; ";
        };
        if (cep == "" || cep == null){
            vazio = true;
            msg += "CEP; ";
        };
        if ( endereco == "" || endereco == null){
            vazio = true;
            msg += "Endereço; ";
        };
        if ( num == "" || num == null){
            vazio = true;
            msg += "Número; ";
        };
        if ( bairro == "" || bairro == null){
            vazio = true;
            msg += "Bairro; ";
        };
        if (cidade == "" || cidade == null){
            vazio = true;
            msg += "Cidade; ";
        };
        if (uf == "" || uf == null){
            vazio = true;
            msg += "UF; ";
        };
        if (pais == "" || pais == null){
            vazio = true;
            msg += "Pais; ";
        };
        if (contato == "" || contato == null){
            vazio = true;
            msg += "Nome Contato; ";
        };
        if (email == "" || email == null){
            vazio = true;
            msg += "E-mail; ";
        };
        if (tel1 == "" || tel1 == null){
            vazio = true;
            msg += "Telefone 1; ";
        };
        if (tel2 == "" || tel2 == null){
            vazio = true;
            msg += "Telefone 2; ";
        };
        if (marcas == "" || marcas == null){
            vazio = true;
            msg += "Marcas; ";
        };
        if (comissao == "" || comissao == null){
            vazio = true;
            msg += "Comissão; ";
        };
        if (modoPgt == "" || modoPgt == null){
            vazio = true;
            msg += "Modo Pgt.; ";
        };
        if (prazo == "" || prazo == null){
            vazio = true;
            msg += "Prazo; ";
        };
        if (payment == "" || payment == null){
            vazio = true;
            msg += "Payment Terms/Due Date; ";
        };
        if (forma == "" || forma == null){
            vazio = true;
            msg += "Forma Contato; ";
        };
        if ( rowCountProd <= 0){
            vazio = true;
            msg += "Adicione um Produto; "
        } else {
            $("input[id^='PRODUTO_TXT___']").each(function(index, value){
                var seq = $(this).attr("id").split("___")[1];
                var produto = $("#PRODUTOS___" + seq).val();
                if( produto == "" || produto == null){
                    vazio = true;
                    msg += "Produto; ";
                };            
            });
        };
        if ( bancoDolar == "" || bancoEuro == null || bancoDolar == null || bancoEuro == ""){
            vazio = true;
            msg += "Dados Bancários; "
        };
        if ( rowCountDoc <= 0){
            vazio = true;
            msg += "Tabela Documentos; ";
        };
        if ( rowCountDoc > 0){
                        
            $("input[id^='DOCUMENTO___']").each(function(index, value){
                var seq = $(this).attr("id").split("___")[1];

                var documento = $("#DOC_ZOOM___" + seq).val();
                var anexado = $("#ANEXADO___" + seq).val();
                var monitora = $("#MONITORAR_VALIDADE_TXT___" + seq).val();

                if( documento == "" || documento == null || documento == undefined) {
                    vazio = true;
                    msg += "Documento; ";
                };
                if ( anexado == "N"){
                    vazio = true;
                    msg += "Anexar Documento; "
                }
                if ( monitora == "S" ){
                    
                    var emissao = $("#EMISSAO___" + seq).val();
                    var validade = $("#VALIDADE___" + seq).val();
                    var perfil = $("#PERFIL").val();
                    var sendEmail = FLUIGC.switcher.getState('#SEND_EMAIL');
                    var sendWhats = FLUIGC.switcher.getState('#SEND_WHATSAPP');
                    // var envioDias = $("#DIAS").val();

                    if( emissao == "" || emissao == null || validade == "" || validade == null){
                        vazio = true;
                        msg += "Emissão/Validade; ";
                    };
                    if ( perfil == "" || perfil == null || perfil == undefined){
                        vazio = true;
                        msg += "Perfil Notificações; "
                    };
                    if ( sendEmail == false && sendWhats == false){
                        vazio = true;
                        msg += "Notifica Email/Whatsapp; "
                    };
                    // if(envioDias == "" || envioDias == null){
                    //     vazio = true;
                    //     msg += "Enviar Notificações"
                    // };
                };           
            });
        };        

        if(vazio){
            
            Swal.fire({
                icon: 'error',
                title: 'Campo(s) obrigatório(s)!',
                confirmButtonColor: '#77B969',
                text: 'Necessário informar: ' + msg
            })

            return false;
        }

        //DESCRIÇÃO COMPLETA DO PRODUROR
        //$("#DESCRICAO_PRODUTOR").val(cnpj + " - " +razao);//EX.: '16.186.867/0001-35 AUTO FRUTAS LTDA'
    };
   
};
