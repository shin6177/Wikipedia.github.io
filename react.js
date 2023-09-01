let themetoggler = document.querySelector("#theme-toggler")
let body = document.querySelector("body")
let datain = document.querySelector("#search-results")
let input = document.querySelector("#search-input")
let form = document.querySelector("#search-form")
let something =  true 

const fetcher = async (query) =>{
    let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${query}`
     try{
        const response = await fetch(url)
        const data = await response.json()
        return data
     }catch(error){
        console.log("error has come brother ")
     }
}


function displayResults(results) {
    // Remove the loading spinner
    datain.innerHTML = "";
  
    results.forEach((result) => {
          console.log(result)
      const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
      const titleLink = `<a href="${url}" target="_blank" rel="noopener">${result.title} </a>`;
      const urlLink = `<a href="${url} class="result-link" target="_blank" rel="noopener">${url}</a>`;
  
      const resultItme = document.createElement("div");
      resultItme.className = "result-item";
      resultItme.innerHTML = `
          <h3 class="result-title">${titleLink}</h3>
          ${urlLink}
          <p class="result-snippet">${result.snippet}</p>
          `;
  
          datain.appendChild(resultItme);
    });
  }



form.addEventListener("submit", async function(e){
    e.preventDefault()
  const query = input.value
   
//   result.innerHTML = ``
      
     if(!query){
        datain.innerHTML = "Please enter the valid term"
        return;
     }
     datain.innerHTML = `<div class='spinner'>Loading ... </div>`
     try{

           const resul = await fetcher(query)
           if(resul.query.searchinfo.totalhits == 0){
            datain.innerHTML = "<p>No results found. </p>";
           }else{
            displayResults(resul.query.search)
           }
    
     }catch(error){
         console.log(error)
         datain.innerHTML = `<p>An error occured while searching. Please try again later. </p>`;
     }
    

   input.value = ''
})



themetoggler.addEventListener("click", function(){
   if(something){
    body.style.color = "white";
    body.style.backgroundColor = "black"
    themetoggler.textContent = "Dark"
    something = false
   }else{
    body.style.color = "black";
    body.style.backgroundColor = "white"
    themetoggler.textContent = "Light"
    something = true
   }
    
})