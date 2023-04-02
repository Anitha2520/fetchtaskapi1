var title = document.createElement("h1");
title.innerHTML = "Dictionary API";
title.setAttribute("class","text-center");
var divflexcontainer = document.createElement("div");
divflexcontainer.setAttribute("class","d-flex p-2 justify-content-center");

var input=document.createElement("input");
input.setAttribute("class","mr-3");
input.setAttribute("type","text");
input.setAttribute("id","word");

var button=document.createElement("button");
button.innerHTML="Display data";
button.setAttribute("class","btn btn-primary");
button.addEventListener("click",displaydata);
divflexcontainer.append(input,button);
var maindiv = document.createElement("div");
maindiv.classList="container p-2 justify-content-center";
maindiv.innerHTML=""; 
document.body.append(title, divflexcontainer,maindiv);

function createdisplaydiv(id,value,text){
    div1=document.createElement("div");
    div1.innerHTML=text+" "+value;
    div1.setAttribute("class","d-flex justify-content-left");
    div1.setAttribute("id",id);
    document.body.append(div1);

}
function displaydata(){
    maindiv.innerHTML="";
    var word = document.getElementById("word").value;
    var res=fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word);    
    res.then(function (response) {
        if(response.status==200){
            return response.json();
        }else{
            return response.status;
        }
    })
    .then((data1)=>fetchdata(data1))
    .catch((error)=>console.log(error));    
}

function fetchdata(data1){    
    if(data1!=404){   
        for(var i=0;i<data1.length;i++){        
            createdisplaydiv("worddisp",data1[i].word,"<b>Word: </b>&nbsp;");
            if(data1[i].meanings.length!=0){
                for(var j=0;j<data1[i].meanings.length;j++){
                    createdisplaydiv("pfsdisp",data1[i].meanings[j].partOfSpeech,"<b>"+[j+1]+") Parts of Speech: </b>&nbsp; ");
                    createdisplaydiv("meaningdisp",data1[i].meanings[j].definitions[0].definition,"<b>"+[j+1]+") Meaning: </b>&nbsp; ");
                }
            }        
        }    
    } else {
        createdisplaydiv("worddisp","","No Definitions Found");
    }
}
function createdisplaydiv(id,value,text){
    div1=document.createElement("div");
    div1.innerHTML=text+" "+value;
    div1.setAttribute("class","d-flex justify-content-left p-2");
    div1.setAttribute("id",id);
    maindiv.append(div1);
}
    

