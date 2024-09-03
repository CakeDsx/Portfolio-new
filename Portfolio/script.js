import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';


mermaid.initialize({ startOnLoad: true });


async function getJson(){
    const getURL = "http://localhost:3999/getjson"
    try {
       const response = await fetch(getURL);
        if(!response.ok){
            throw new Error("You Ducked Up")
        }
        const data = await response.json();
        return data 
    } catch(error){console.error("Unable to fetch data:", error)}
  
}

export async function handleProjects() {
        const projects = await getJson();
        // Access a specific project by its key
        const keys = Object.keys(projects);
        let a, li, para, linkText, element;
        element = (document.getElementById("projectsDiv"));
        for (let i = 0; i < keys.length; i++) {
        a = document.createElement("a");
        li = document.createElement("li");
        para = document.createElement("para");
        linkText = document.createTextNode(keys[i]);
        
        a.appendChild(linkText);
        a.title = (`${keys[i]}`);
        a.href = `/${keys[i]}`;
        li.appendChild(a)

        element.appendChild(li);
        element.appendChild(para);
    }
    }

    export async function postjson(event, form){
        const formData = new FormData(form);
        const postURL = "http://localhost:3999/postjson";
        const title = formData.get("title");
        const date = formData.get("date");
        const description = formData.get("description");
        const [year, month, day] = date.split("-");
        await fetch(postURL), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            [title]: {
                "id": Date.now(),
                "date": {
                    "day": day,
                    "month": month,
                    "year": year
                },
                "description": description
            }
        })
        };
    console.log("Replacing Window");
    window.location.replace("/");    
    }

