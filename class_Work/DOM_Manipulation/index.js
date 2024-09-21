let ctr = 0;
function callback(){
    
    const fetch = document.querySelectorAll("h3")[1];
    fetch.innerHTML = ctr;
    ctr++;
    
}

setInterval(callback,1000);