/*camera.js*/
var cam_options;

//Initialize with reasonable defaults
cam_options = {
	quality: 50,
	destinationType: 1,
	sourceType: 1,
	correctOrientation: true,
	encodingType: 0
};

//Set JSON array config 
function cam_config(options){
	cam_options = options;
}

//Get a photo using the provided options, or use the defaults if none are provided
function cam_getPhoto(callback){

	//Camera Error Handler
	var onCamError = function(error) {
	    var msg = 'Camera Error: ' + error.code;
	    navigator.notification.alert(msg, null, 'Camera Error');
	    callback(0);
	}

	//Camera Success, send result to callback
	var onCamSuccess = function(imageURI){
		callback(imageURI);		
	}

	navigator.camera.getPicture(
		onCamSuccess,
		onCamError,
		cam_options
	);		
	
}