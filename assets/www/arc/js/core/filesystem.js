function fs_init(type){
    return getFileSystemRoot();
}

// retrieves root file system entry
var getFileSystemRoot = function() {

    // private
    var root;
    
    // one-time retrieval of the root file system entry
    var fs_access = function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {
                root = fileSystem.root;
            }, 
            onFileSystemError);
    };
    document.addEventListener("deviceready", fs_access, true); 

    return root;
}; 

//Writes data to the filesystem
function fs_writeFile(fileName) {
        // root file system entry
    var root = getFileSystemRoot(),
    
        // writes a file
        write_file = function(writer) {
            var lineCount = 1;
                      
            // set the callbacks
            writer.onwritestart = onFileEvent;
            writer.onprogress = onFileEvent;
            writer.onwrite = onFileWrite;
            writer.onabort = onFileEvent;
            writer.onerror = onFileError;
            writer.onwriteend = function(event) 
            {
                onFileEvent(event);
                lineCount += 1;
                if (lineCount <= 3) {
                    // append a new line   
                    writer.write('Line ' + lineCount + '.\r\n');  
                } 
                else {
                    
                }
            }
            
            // append
            writer.seek(writer.length);
  
            // write to file
            writer.write('Line ' + lineCount + '.\r\n');   
        },
        
        // creates a FileWriter object
        create_writer = function(fileEntry) {
            fileEntry.createWriter(
                write_file, 
                onFileWriteError
            );
        };
    
    // create a file and write to it
    root.getFile(
        fileName, 
        {
            create: true
        }, 
        create_writer, 
        onFileSystemError
    );
}

//Delete File
function fs_deleteFile(fileURI) {
    var root = getFileSystemRoot();
    
    //function-wide file entry
    var fileObject;

    //function-wide return string
    var returnData;

    //Step 3 - Return 1 if done, otherwise return 0
    var delete_success = function(){
        returnData = 1 
    }
    var delete_failure = function(error){
        onFileSystemError(error)
        returnData = 0;
    }    

    //Step 2 - Try and actually delete it
    var remove_file = function(entry) 
    {
        fileObject = entry;
        fileObject.remove(
            delete_success,
            delete_failure
        );
    };
    
    // Step 1 - get access to file
    root.getFile(
        fileURI, 
        {
            create: false
        }, 
        remove_file, 
        onFileSystemError
    );

    return returnData;
} 

//Moving a File
function fs_moveFile(oldFileURI, newDirectoryURI, newFileName) {
    var root = getFileSystemRoot();

    //function-wide destination directory
    var directoryObject;
    //function-wide file entry
    var fileObject;
    //function-wide return string
    var returnData;

    //Step 4 - Return new File's URI, otherwise return 0
    var move_success = function(entry){
        returnData = entry.fullPath;
        //return fileObject.toURI;
    }

    var move_failure = function(error){
        onFileError(error)
        returnData = -1;
    }

   
    //Step 3 - Use Directory and File to Move
    var move_file = function(entry) {
        fileObject = entry;
        fileObject.moveTo(
            directoryObject,
            newFileName,
            move_success, 
            onFileSystemError
        );
    };
    
    //Step 2 - Use Directory and Get File
    var get_file = function(directory){
        directoryObject = directory;
        // retrieve a file and move it
        root.getFile
        (
            oldFileURI, 
            {
                create: false
            }, 
            move_file, 
            onFileError
        );
    }

    //Step 1 - Get Direcotry
    root.getDirectory
    (
        newDirectoryURI, 
        {
            create: false
        }, 
        get_file, 
        onDirectoryError
    ); 

    return returnData;
}

/*Error Handlers*/
//Generic Log Event
function onFileEvent(event) {
    console.log('file event: ' + event.target.fileName + ' ' + event.type);
}
//File System Error Handler
function onFileSystemError(error) {
    var msg = 'Error Accessing Filesystem: ' + error.code;
    navigator.notification.alert(msg, null, 'File System Error');
}
//File Exception
function onFileError (error) {
    var msg = "Unable to access file: " + error.code;
    navigator.notification.alert(msg, null, 'File Fail');    
}
//File Write Event
function onFileWrite(event) {
    var msg = 'File Write Event: ' + event.target.error.code;
    navigator.notification.alert(msg, null, 'File Write Event');    
}
//File Write Error
function onFileWriteError(error) {
    var msg = 'file error: ' + event.target.error.code;
    navigator.notification.alert(msg, null, 'File Write Error');    
}
//Directory Exception
function onDirectoryError (error) {
    var msg = 'Directory Failed: ' + event.target.error.code;
    navigator.notification.alert(msg, null, 'Directory Failed');
}