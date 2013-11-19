var db_obj = 0;

function db_init(name, buildFile)
{
	db_obj = window.openDatabase(name, '1.0', name, 200000);
	
	$.ajax(buildFile, {
		async: false,
		success: function(response) {
			db_obj.transaction(function(tx) {
					$(response).find('statement').each(function(){
						tx.executeSql($(this).html());								
					});	
				}, 
				db_errorCB
			);
		}
	});
}

function db_query(sql, options)
{
	db_obj.transaction(function(tx) {
			tx.executeSql(sql, [], options.success, options.error ? options.error : db_errorCB);
		}, 
		db_errorCB
	);
}

function db_errorCB(err) 
{
    alert('Error processing SQL: ' + err.code);
}