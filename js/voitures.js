import { voituresInitiales } from './data.js';


const tbody =  document.getElementById("liste-voitures");

function afficher(){
    voituresInitiales.forEach(element => {
        const tr = document.createElement("tr");
        tbody.append(tr);
       

        const td = document.createElement("td");
        tr.append(td);

        const strong = document.createElement("strong");
        td.append(strong);
        strong.textContent = element.marque ;

        const td2 = document.createElement("td");
        tr.append(td2);
        td2.textContent = element.modele ;




        const td3 = document.createElement("td");
        tr.append(td3);

        const span = document.createElement("span");
        td3.append(span);
        span.classList.add("registration");
        span.textContent = element.immatriculation



        const td4 = document.createElement("td");
        tr.append(td4);
        td4.textContent = element.categorie ;



        const td5 = document.createElement("td");
        tr.append(td5);
        td5.classList.add("price");
        td5.textContent = element.prixJour

        const span2 = document.createElement("span");
        td5.append(span2);
        span2.textContent = "DH / jour";



        const td6 = document.createElement("td");
        tr.append(td6);

        const span3 = document.createElement("span");
        td6.append(span3);
        span3.classList.add("badge")
        span3.textContent = element.statut;
        switch(element.statut){
            case "Disponible":
                span3.classList.add("badge-disponible");
                break;
            case "Louée":
                span3.classList.add("badge-louee");
                break;
            case "En maintenance":
                span3.classList.add("badge-maintenance")
                break;
        }


        const td7 = document.createElement("td");
        tr.append(td7);

        const div = document.createElement("div");
        td7.append(div);
        div.classList.add("row-actions");

        const btn_modif = document.createElement("button");
        div.append(btn_modif);
        btn_modif.setAttribute("type" , "button");
        btn_modif.classList.add("button" , "button-edit");
        btn_modif.setAttribute("data-action","modifier");
        btn_modif.setAttribute("data-id" , element.id);
        btn_modif.setAttribute("aria-label" , `modifier ${element.marque}  ${element.modele} , ${element.immatriculation} `);
        btn_modif.textContent = "Modifier";


        const btn_sup = document.createElement("button");
        div.append(btn_sup);
        btn_sup.setAttribute("type" , "button");
        btn_sup.classList.add("button" , "button-delete");
        btn_sup.setAttribute("data-action","supprimer");
        btn_sup.setAttribute("data-id" , "1");
        btn_sup.setAttribute("aria-label" , `supprimer ${element.marque}  ${element.modele} , ${element.immatriculation} `);
        btn_sup.textContent = "Supprimer";
    });
}
afficher();










