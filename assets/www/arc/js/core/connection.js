function conn_status()
{
	var status = {
		available: false,
		type: Connection.NONE,
		gtype: Connection.NONE,
		label: 'No network connection'
	};
	
	status.type = navigator.connection.type;
		
	switch(navigator.connection.type)
	{
		case Connection.UNKNOWN:
			status.available = true;
			status.gtype = Connection.UNKNOWN;		
			status.label = 'Unknown connection';
			break;
			
		case Connection.ETHERNET:
			status.available = true;
			status.gtype = Connection.ETHERNET;
			status.label = 'Ethernet connection'
			break;
			
		case Connection.WIFI:
			status.available = true;
			status.gtype = Connection.ETHERNET;
			status.label = 'WiFi connection';			
			break;
			
		case Connection.CELL_2G:
			status.available = true;
			status.gtype = Connection.CELL;
			status.label = 'Cell 2G connection';
			break;
			
    	case Connection.CELL_3G:
    		status.available = true;
    		status.gtype = Connection.CELL;
    		status.label = 'Cell 3G connection';    		
    		break;
    		
    	case Connection.CELL_4G:
    		status.available = true;
    		status.gtype = Connection.CELL;
    		status.label = 'Cell 4G connection';
    		break;
    		
    	case Connection.CELL:
    		status.available = true;
    		status.gtype = Connection.CELL;
    		status.label = 'Cell generic connection';
    		break;    		
    }
   
	return status;
}