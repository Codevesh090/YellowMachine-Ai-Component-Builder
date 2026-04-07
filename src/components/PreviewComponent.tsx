import { useMemo } from "react";

type Prop = {
  code:string
}

const buildSrcDoc = (code: string) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <script src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
      <script src="https://cdn.tailwindcss.com"><\/script>

      <style>
        body {
          margin: 0;
          padding: 16px;
          font-family: sans-serif;
          background: #0c0c0c;
        }
      </style>
    </head>

    <body>
      <div id="root"></div>

      <script type="text/babel">
        try {
          const Component = () => (
            ${code}
          );

          ReactDOM.createRoot(document.getElementById("root"))
            .render(React.createElement(Component));
        } catch (err) {
          document.body.innerHTML = "<pre style='color:red'>" + err.message + "</pre>";
        }
      <\/script>

       <script>
        window.onerror = function(msg) {
          document.getElementById("root").innerHTML =
            '<pre style="color:red; padding:16px;">Error: ' + msg + '</pre>';
        };
     <\/script>

    </body>
  </html>
  `;
}; //To understand this☝️ code refer to Case103 in Readme.md

//Doubt -> You are saying everytime we call buildSrcDoc new string comes over , but it is wrong , everytime toh same hi string aa raha hai?
//Answer -> Nahi har baar jab hum call kar rahe hai , toh new string generate ho raha hai and wo memory me kahi save ho raha hai and hume uska bus address mil raha hai which we store in const src doc , Now because everytime new address so it means srcDoc is changing.
//Remember -> Hum kabhi bhi kisi variable me kuch store nahi karte hai , balki kisi stored thing ka refrence yaani address where it saved in memory use store karte hai . ALWAYS .
//Like humne srcDoc me string nahi balki string memory me kaha store hai uska address save kiya hai .

const PreviewComponent = ({code}:Prop) => {
  const srcDoc = useMemo(()=>buildSrcDoc(code),[code]); //when there is any change in the "code" then call this buildSrcDoc function with the parameter "code" . Yaha humne useMemo ka use isliye kiya hai ,kyuki agar hum useMemo use nahi karte toh kisi bhi change se agar re-rednder hota toh baar-baar buildSrcDoc() chal jaata , jisse kya hota ki new string aati , jisse "srcDoc" variable me change aata and usme change aane se iframe baar-baar reload hota and iframe ko reload karna bahut heavy process hai and if iframe reloads again and again then it causes lags in our frontend , that's why to prevent that we use useMemo jo dhyaan rakhta hai ki if there is any change in "code" then only reload the iframe else not , which makes our frontend efficient. 
  return (
    <div className="w-full h-full overflow-hidden">
    <iframe
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      className="w-full h-full border-0"
      />
    </div>
  )
}

export default PreviewComponent

//Sabse pehle humne ek dibba banaya jiske andar sandbox banega through iframe <div className="w-full h-full overflow-hidden">
//Uske baad humne us dibbe ke andar humne sandbox daal diya.
//Now , ab yeh iframe kaise kaam karta hai ki , yeh kya karta hai ki yeh code ki script leta hai yaa kisi webpage ka link 
//leta hai and it execute that in its sandbox . iframe me jo yeh attribute hai sandbox="allow-scripts" yeh kya karta hai ki
//sandbox me 	•	❌ No JavaScript	❌ No form submission ❌ No popups ❌ No access to cookies/localStorage ❌ Treated as a different origin
//Yeh sab allowed nahi hota hai but if we write allow-scripts jo hume us sandbox me sirf JS chalane(run) ki permission mil jaati hai
//Hum Ai se mila hua code khud bhi chala sakte hai apni hi react app me render kar sakte hai , but we use iframe because hum AI ke diye hue code par trust nahi kar sakte hai naa
//kya pata wo koi esa malicious code ho , jise hum agar sandbox me naa run karke apne broswer me run kar toh kya pata wo hamari info localstorage or cookies
//se steal karke kahi aur bhej de that's why we use iframe which is safe as it runs the code isolately in a sandbox and it does not give access to our localStorage , cookies etc.
//Now toh till here now iframe ko code mil gaya toh wo run karke hume sandbox me preview dikha dega .

