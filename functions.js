
/**
* SEND TO FILESTACK AND GET URL
*/
export function  sendData(inputData , getUrl , func)
{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.filestackapi.com/api/store/S3?key=A5pOILz7YRTG1Mef3iIMCz")
    xhr.onload = () => console.log(xhr.status);
    
    xhr.onreadystatechange = () => 
    {
    
        if (xhr.readyState === 4) 
        {
            var url = xhr.responseText;
            var jsonResponse = JSON.parse(url);
            console.log(jsonResponse["url"]);
            getUrl = jsonResponse["url"] 
            
        }   
    };
     xhr.send(inputData);
}    


/**
* SEND TO FILESTACK AND PUT URL AS PARAMETER
*/


export function sendDataParams(inputData , urlCode ,key )
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
    }
        xhr.send(inputData);
}





/**
* ADD REMOVE URL PARAMETERS
*/

export function addOrUpdateURLParam (key, value)
{
   const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, value)
    const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()
    history.pushState(null, "", newRelativePathQuery)
}

/**
* Removes URL parameters
* @param removeParams - param array
*/
export function removeURLParameters(removeParams) {
    const deleteRegex = new RegExp(removeParams.join('=|') + '=')
  
    const params = location.search.slice(1).split('&')
    let search = []
    for (let i = 0; i < params.length; i++) if (deleteRegex.test(params[i]) === false) search.push(params[i])
  
    window.history.replaceState({}, document.title, location.pathname + (search.length ? '?' + search.join('&') : '') + location.hash)
  }
  
  //removeURLParameters(['param1', 'param2'])

  

  

export function getQueryVariable(variable) 
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i=0;i<vars.length;i++) 
    {
        var pair = vars[i].split("=");
        if (pair[0] == variable) 
        {
         return pair[1];
        }
    } 
}


/* export function urlToString(code , urlString) 
{
const imgtoBase64 = require('image-to-base64')

app.get('/', (req, res) => {
    var URL = `https://cdn.filestackcontent.com/${code}`;

    imgtoBase64(`${URL}`)
            .then( (response) => {
                console.log('data:image/png;base64,' + response);  // the response will be the string base64.
                urlString = 'data:image/png;base64,' + response
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
});

}
 */

export function urlToString(code , urlString) 
{
    (async function() {
        let blob = await fetch(`https://cdn.filestackcontent.com/${code}`).then(r => r.blob());
        let dataUrl = await new Promise(resolve => {
          let reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
          
        });
         urlString = dataUrl/* .replace("text/plain", "image/png"); */
         console.log(urlString)
    })();

}
