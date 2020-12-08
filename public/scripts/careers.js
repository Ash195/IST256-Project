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
    $('#submit').on('click',(e) => {
        while(x < 900){
            let jobname = related_jobs[x].job_title;
            let job = $('#input').val();
            if(jobname.includes(job)){
            let p = $('<ul></ul>').text(jobname);
            $('#rec_jobs').append(p);
            }
            x++;
            }
    })
        
}

  
  
  
  