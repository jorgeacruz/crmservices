function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	// Cria novo DataSet
	var ds = DatasetBuilder.newDataset();

	// adiciona das coluna ao DataSet
	ds.addColumn("simbolo");
	ds.addColumn("nomeMoeda");
	
	// adiciona valores as colunas
	ds.addRow(new Array("R$","Real"));
	ds.addRow(new Array("US$","Dola Americano"));
	ds.addRow(new Array("U$","Peso Uruguaio"));

	return ds;

}function onMobileSync(user) {

}