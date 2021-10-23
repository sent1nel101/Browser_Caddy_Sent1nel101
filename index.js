let myLeads = []
let leadNames = []
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const clearBtn = document.getElementById("clear-btn")
const getLeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const getNamesFromLocalStorage = JSON.parse(localStorage.getItem("leadNames"))
// const tabTitle = document.getElementById("title").textContent

function render(leads, names){
  let listItems = ""
  for (i = 0; i < leads.length; i++){
  listItems += `
        <li>          
            <a id="openTab" target="_blank" href="${leads[i]}">${names[i]} <br/>  ${leads[i]}
            </a>  
        </li>`;
  }    
ulEl.innerHTML = listItems
}


if (getLeadsFromLocalStorage, getNamesFromLocalStorage){
    myLeads = getLeadsFromLocalStorage
    leadNames = getNamesFromLocalStorage
    render(myLeads, leadNames)
}

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value);
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))  
  render(myLeads, leadNames);  
})

tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url )  
    leadNames.push(tabs[0].title )
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    localStorage.setItem("leadNames", JSON.stringify(leadNames))
    render(myLeads, leadNames)
  })
  
})


clearBtn.addEventListener("dblclick", function(){
    localStorage.clear() 
    myLeads = []
    leadNames = []
    render(myLeads, leadNames)
  })

  function clearInput(){
    document.getElementById("input-el").value = ""
  }



// Allow the user to press 'Enter / Return' to save items to the list.
var input = document.getElementById("input-el");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    
    document.getElementById("input-btn").click()
  }
})