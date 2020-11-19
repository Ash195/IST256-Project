//ran into a few issues accessing specific elements, but 
//successfully retrieved jobs and logged in console
const rootURL = 'http://api.dataatwork.org/v1/';

$(document).ready(function(){
    search();
});


function search(){
    $.ajax({
        url: rootURL + 'jobs',
        method: 'GET',
        success: success

    });
}
function success(data){
    console.log(data);
}

  
  