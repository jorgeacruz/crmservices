// validandos os campos
function validateForm(form) {

    var msg = "";

// info requisitante
    if( form.getValue("NOME") == "" ) {
        msg += "Campo Nome não foi preenchido!</br>";
    }
    if( form.getValue("EMAIL") == "" ) {
        msg += "Campo EMAIL não foi preenchido!</br>";
    }
    if( form.getValue("TIPOPONTO") == "" ) {
        msg += "Campo Tipo de Ponto não foi preenchido!</br>";
    }
    if( form.getValue("DIRETOR") == "" ) {
        msg += "Escolha um diretor do projeto!</br>";
    }
    if( form.getValue("VALOR") == "" ) {
        msg += "Campo VALOR não foi preenchido!</br>";
    }
    if( form.getValue("CEP") == "" ) {
        msg += "Campo CEP não foi preenchido!</br>";
    }
    if( form.getValue("NUMERO") == "" ) {
        msg += "Campo NUMERO não foi preenchido!</br>";
    }
    if (form.getValue("MEUCALENDARIO") == ""){
        msg += "Data de nascimento não foi preenchido</br>"
    }


// Final    
    if(msg != "") {
        throw msg;
    }
}