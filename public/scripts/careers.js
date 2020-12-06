const rootURL = 'http://api.dataatwork.org/v1/';

$(document).ready(function(){
    search('2c77c703bd66e104c78b1392c3203362');
});


function search(id){
    $.ajax({
        url: rootURL + 'skills/' + id + '/related_jobs' ,
        method: 'GET',
        success: success

    });
}
function success(data){
    let related_jobs = data.jobs;
    let x = 0;
        while(x < 10){
        let jobname = related_jobs[x].job_title;
        console.log(jobname);
        let p = $('<ul></ul>').text(jobname);
        $('#rec_jobs').append(p);
        x++;
        }
}

  
  
  
  