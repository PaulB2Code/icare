var array = ["1", "2"];





//Requête de la base

function getDataBAseInfo(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);

    var value = xmlHttp.responseText;

    var responseBDTmp = JSON.parse("[" + value + "]");
    console.log(responseBDTmp);
    var responseBDTmp2 =  responseBDTmp[0];
    console.log(responseBDTmp2[0]);

    for (var i = 0; i < responseBDTmp2.length; i++ ){
      var responseBD = responseBDTmp2[i];
      console.log("Item");
      console.log(responseBD);
      document.getElementById('listValue')

      var tbody = document.getElementById("listValue");
      var tr = document.createElement("tr");

      var titre = document.createElement("td");
      var description = document.createElement("td");
      var fd = document.createElement("td");
      var mp  = document.createElement("td");
      var ampl = document.createElement("td");
      var action  = document.createElement("td");

      titre.appendChild(document.createTextNode(responseBD[0]));
      description.appendChild(document.createTextNode(responseBD[1]));
      fd.appendChild(document.createTextNode(responseBD[2]));
      mp.appendChild(document.createTextNode(responseBD[3]));
      ampl.appendChild(document.createTextNode("Site Barentin"));
      var a1  = document.createElement("a");
      a1.setAttribute('href', 'diffuse?id='+responseBD[4]);
      a1.appendChild(document.createTextNode("Diffuser   "));
      action.appendChild(a1);

      var a2  = document.createElement("a");
      a2.setAttribute('href', 'supress?id='+responseBD[4]);
      a2.appendChild(document.createTextNode("Supprimer"));
      action.appendChild(a2);


      tr.appendChild(titre);
      tr.appendChild(description);
      tr.appendChild(fd);
      tr.appendChild(mp);
      tr.appendChild(ampl);
      tr.appendChild(action);

      tbody.appendChild(tr);

    }

}

getDataBAseInfo("/database/info");
/*
document.getElementById('listValue')

var tbody = document.getElementById("listValue");
var tr = document.createElement("tr");

var titre = document.createElement("td");
var description = document.createElement("td");
var fd = document.createElement("td");
var mp  = document.createElement("td");
var ampl = document.createElement("td");
var action  = document.createElement("td");

titre.appendChild(document.createTextNode("Titre"));
description.appendChild(document.createTextNode("description"));
fd.appendChild(document.createTextNode("dg"));
mp.appendChild(document.createTextNode("mp"));
ampl.appendChild(document.createTextNode("emplacement"));
action.appendChild(document.createTextNode("action"));


tr.appendChild(titre);
tr.appendChild(description);
tr.appendChild(fd);
tr.appendChild(mp);
tr.appendChild(ampl);
tr.appendChild(action);

tbody.appendChild(tr);
*/
