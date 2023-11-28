export class SendServerAddParam
{
        

    constructor()
    {
                
    }
    export function sendData(inputData , urlCode ,key )
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://www.filestackapi.com/api/store/S3?key=A5pOILz7YRTG1Mef3iIMCz")
        xhr.onload = () => console.log(xhr.status);
        
        xhr.onreadystatechange = () => 
        {
        
            if (xhr.readyState === 4) 
            {
                var url = xhr.responseText
                var jsonResponse = JSON.parse(url)
                console.log(jsonResponse["url"])
                               
                urlCode =  jsonResponse["url"] .substring(33)  
                console.log("getUrl=" + urlCode)    
                var searchParams = new URLSearchParams(window.location.search)
                searchParams.set(key, urlCode)
                var newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()
                history.pushState(null, "", newRelativePathQuery)
                
            }   
        };
         xhr.send(inputData);
    }
}
