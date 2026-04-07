<Case101>
Toh yeh api key input box wala concept kaam kaise kar raha hai .
Toh yeh eise kaam kar raha hai ki user input box fill karta hai .
And when he clicks on save then a function runs jo pehle e.preventdefault() karta hai.
And then yeh mainly do kaam karta hai , Sabse pehle yeh check karega ki "apiKeyDraft" state me kuch hai ki nahi hai . Yaani user ne kuch input kiya hai ki nahi .
Also , yeh jo input ka case hai like value and onChange formHandling yeh hum apiKeyDraft se
kar rahe hai . Yeh apiKeyDraft waali state formHandling sambhal rahi hai .
Now, ab let say kuch nahi hai input box me toh wahi "return" kar do .
Else agar hai toh do these two things :
1st > apiKeyValueContext?.setapiKeyValue(apiKeyDraftContext.apiKeyDraft); <which means apiKeyValue karke ek aur state hai jisme hum jo input tha use daalte hai >
2nd > Uske baad hum localStorage.setItem("geminiApiKey",apiKeyDraftContext?.apiKeyDraft || "")
<localstorage me bhi wo input save karte hai >
Uske baad kuch nahi "input box clear" and "stop loading" .

Par yaha humne kyu ek baar "State me value" set ki and ek baar "LocalStorage me daala".
<Kyuki hum yaha yeh karte hai ki "state me value isliye daala hai kyuki wahi se hum api key throughout the code use karte hai"
<And local storage isliye daalte hai kyuki let say user ne website "reload" kar di , tab toh use phir se wapas use apiKey daalni padegi , which is hectic . So what we do we save the api key in localStorage and then if website reloads then toh everythings gets a render , toh usi time par yeh jo humne likha tha   "const [apiKeyValue, setapiKeyValue] = useState(()=>localStorage.getItem("geminiApiKey") ?? "") " Yeh bhi run hoga toh iske andar ka function bhi run hoga which is ()=>localStorage.getItem("geminiApiKey") jo kya karega local storage se jaakar apikey le aayega and apiKeyValue ko khud hi set kar dega .Jisse hamara system is "persistent" means even after reload it have the key >

And that's the full flow of How its work .

//Flow of api key input box.

Type key → click Save →
  → state (apiKey) updated
  → localStorage updated

App uses apiKey (state)

Reload →
  → app restarts
  → useState initializer runs
  → reads from localStorage
  → sets apiKey again

//Flow of api key input box.
<Case101>


<Case102>
<npm install @google/generative-ai> Google ka library hai jo tumhe AI models (like Gemini) use karne deta hai
<Case102>


Agar hum iframe use nahi karnge , toh let say if we run this in our webpage then aisa bhi ho sakta hai ki us code me aisa kuch likha ho ki take the api key from its local storage and send it to this link , so in this way toh hamari api key and etc. things are not safe . hence we use it .

computer got the code , (pakages,compiler)
but it needs packages to install so we do it through cdn .Now our code is ready


To run this code :

we need to install React library , all dependencies do through cdn in sandbox .
Then we need a compiler which is babel here which converts jsx to js and then react use js to create virtual dom and then browser apply the ui . tailwind to css we used cdn already .
renderig ka matlab hi hota hai js ko virtual dom me conevrt karke them compare karke ,changes daalna see it
react is a library of javascript which works on top of js engine .
any sandwork need these 4 things to run .



<Case103>
Humne sabse pehle html ka full syntax likha which is :
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
----------------------------------------------------------------------------------
In here,<head> we put down two things 1st. <script> tag and 2nd is <style> tag.

In <script>
Sabse pehle humne cdn(Content Delivery Network) se 3 things mangwayi.
1st. React
2nd. Babel
3rd. Tailwind

In <style>
Humne default style set kiya , kyuki if we cannot apply then browser applies its own , an tab wo thoda insconsistent dikhayi dega and wierd lagega dekhne me , isliye humne khud hi thoda define kar diya hai yaha


What is CDN ?
cdn (Content Delivery Network) hota hai , yaani kya hota hai ki hum agar apna koi code sandbox me chalana chalte hai toh uske liye hume us code me jo bhi library ya framework use ho raha hai wo installed chahiye naa , we need node modules and etc.. things to run React,Js etc.. and also sandbox me toh sirf js engine hota hai . IT HAS No build system ❌ •	No npm ❌ •	No bundler  ❌ compiler etc.. bhi nahi hota hai jo jsx ko js me convert kar paaye and tailwind ko css me .

Toh ab hum yeh sabhi cheeze kaha se laaye ?
Toh isi time par kaam aata hai CDN 
CDN internet se directly file load kar (without installing) deta hai jo bhi hume chahiye.
And also CDN = has fast servers across world,so loading is quick.
like here we did 
<script src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
Toh yeh kya kar raha hai ki react ko chalane ke liye jo-jo dependencies etc.. chahiye wo yeh directly
Internet ke through hi connect kar deta , CDN files install nahi karta hai but internet par jaha files 
padi hai unse connect kar deta hai , jisse hamari dependencies,node modules and etc.. ki need khatam ho jaati hai .React is NOT installed locally ❌ React is being loaded from internet.

Also,Cdn is capable of loading compilers like "Babel" and Css generators like "tailwindcss" .
<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
<script src="https://cdn.tailwindcss.com"><\/script> 

Yeh babel kya karta hai , toh babel hamare JSX code ko JS object me convert karta hai , jisse phir baad me react Ek virtual dom me convert karta hai and then compare it with the real DOM and then updates the real dom and then uspar Browser css lagata hai and then it shows on the screen .

Yeh tailwindcss "css generator" kya karta hai , toh yeh tailwind ko css me convert karta hai , so that browser understand it . 

1st render means JSX ko Js object me convert karna babel ke through -> then React us collection of JS object ko Real Dom me convert karta hai and then Browser applies the css on that real dom and then it showcases on the screen . (If we are using tailwind then isme ek step aur hota hai tailwind to css conversion but this step is dynamic means when we writes tailwind , in Real Time it converts to CSS ).

re-render or 2nd render or 3rd render means JSX ko Js object me convert karna through babel --> then React us collection of Js object ko Virtual Dom me convert karta hai and then it compares it with the Real Dom(Old Dom) which means the Old DOM which we created previously then this render and then jo-jo differences honge usse Real Dom ko update kar dega and then Browser applies the css on those updated nodes and then those updated nodes gets reloaded and showcases on the screen .Remember Real Dom pura kabhi bhi re-render me reload nahi hota hai,only the components/nodes that are updated or changed gets reloaded . Tabhi toh React is fast as it does not have to load the full Real Dom again and again with every update.We only have to load the updated pieces . 

Real Dom wo hota hai jo 1st render me bana hota hai and wahi render-render update hota jaata hai and usi par browser css lagakar hume screen par dikhata hai .

When we work with react in Vs code then we use ESBuild Compiler not babel as  ESBuild = much faster (written in Go) and ESBuild is by default compiler when we install React through Vite .We can change it if we want.

-----------------------------------------------------------------------------------
Now we come here,In <body> tag

Toh kya hota hai ki hamara jitna bhi code hota hai wo ek div ke andar hi hota hai,So we created it
<div id="root"></div> and gave id to it.

Uske baad humne <script> tag ka use kiya and uspar ek attribute set kiya type="text/babel".“This code is written in JSX / modern JavaScript, so compile it using Babel before running it.”

After that , what we did is that humne jo JSX code Ai ne diya tha . Use humne ek ()=>() ese function me daala , kyuki jsx ko hum sirf ke function me hi likh sakte hai not outside .

Uske baad humne -> ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Component)); yeh kiya, jo kya kar raha hai ki wo jo div humne starting me create kiya tha use uski "id" ke through pakad raha hai and usme "Component" function ko render kar de raha hai , yaani usme React ko render kar de raha hai .And this is how we see the preview when this whole code runs in a sandbox .

Humne kyuki try-catch use kiya hai , toh humne ab try to handle kar liya , now its time to handle catch , Toh catch me humne likh diya ki if try fails then tum kya karna <document.body.innerHTML = "<pre style='color:red'>" + err.message + "</pre>";> which means tum screen par error show kar dena in red color.

After that we, again used <script> tag and this time yeh tag kya kar raha hai ki wo ek error handle kar raha hai . Yaani if any error comes up , render hone ke baad bhi then use yeh handle kar lega and show that error on the screen .

One important point: 👇
Use <\/script> not </script> as 
Browser HTML parser sees </script>
→ thinks script tag is ending HERE ❌
→ breaks your template string ❌

We break it slightly:<\/script>
sO THAT Now browser sees:"this is just text, not a real closing tag"

Its confusing see it once 👁️ ☝️

That's it, this is how when this code runs then it show preview of our jsx code in our iframe sandbox.


So the full flow is :
JSX(Using babel) -> Js Object(Using React) -> Virtual Dom(Created this and compared with Real Dom) -> Real Dom updated -> Browser applies css on those updated parts only -> Displayed those updated parts on screen in sandbox . Isme kahi bhi esa nahi hota hai ki Real dom pura reload hua ho , only the changed components gets reloaded and browser applies updated css on those .


Also,
To run code in any sandbox you need:
1. Code (your input)
2. Runtime (React Library / JS engine)
3. Compiler (if needed, like Babel)
4. Execution environment (browser / iframe)

React is a JS library which runs on the top of Js engine.
<Case103>

<Case104 from .env>
Only variables starting with VITE_ are exposed to frontend.
Yaani agar hum .env me koi bhi credential VITE_ se start karte hai toh wo frontend par expose ho jaata hai.
Because frontend code browser me run hota hai 👉 jo bhi expose karoge, user dekh sakta hai.

But then what's the need to expose these credentials on frontend:
Because 

With these credentials 

Frontend → Firebase (Our frontend directly talks to database)
✔ Simple
✔ Fast
✔ No backend needed
✔ Used by most Firebase apps

Without these credentials 
Frontend → Backend → Firebase (need a backend to talk to firebase)
✔ More secure
❌ More complex
❌ Needs server

And also firebase ke credentials agar kisi ko pata bhi chal jaaye then also it does not effect anything .
they cannot access data ❌ due to firebase rules and Security . 

VITE_API_KEY=123   ✅ accessible
API_KEY=123        ❌ not accessible
<Case104 from .env>


<Case105>
initializeApp(firebaseConfig) .This is used to connect our app to firebase or to initialize firebase .
getFirestore(app)  .Firebase ke andar firestore hota hai. So, to reach or initialize firestore we use this.
collection(db,"components") .It is used to access a particular folder("collection") in the db or firestore.
addDoc(...) .It is used to create a document in our folder that we created . As we know we say each data part as a "document" in a noSql DB .
getDocs(query) .It is used to get the data from the db.
deleteDoc(...) .It is used to delete the data from the db.
doc .It means specific . Like we wrote deleteDoc(doc(db, COLLECTION_NAME, id)) which means delete only this specific in "db" in this collection name "components" with this "id".
query → filtering .It filters on the basis of parameters we gave to it.
orderBy → sorting  .It is to make the data in a particular order . ascending or desending
limit → max items .Matlab max kitne items laane hai.



Because firebase gives like this [doc1,doc2,doc3] 
So,using map we convert it into .
[
  {
    id: "abc",
    prompt: "button",
    code: "<div>...</div>"
  },
  {
    id: "xyz",
    prompt: "card",
    code: "<div>...</div>"
  }
]
<Case105>