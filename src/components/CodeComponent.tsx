import { Highlight, themes } from "prism-react-renderer";

type Prop = {
  code: string;
};

const CodeComponent = ({ code }: Prop) => {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-gray-800 mb-20 overflow-hidden">
      
      {/* Scroll container */}
      <div className="overflow-x-auto overflow-y-auto max-h-125">
        
        <Highlight theme={themes.duotoneLight} code={code} language="jsx">
          {({ style, tokens, getLineProps, getTokenProps }) => (
            
            <pre style={{...style,margin: 0,backgroundColor: "#FFF3C6",}} className="min-w-max p-4 text-sm whitespace-pre" >
              
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  
                  {/* Line number */}
                  <span className="inline-block w-8 text-right mr-4 text-gray-600 select-none">
                    {i + 1}
                  </span>

                  {/* Code */}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}

                </div>
              ))}

            </pre>
          )}
        </Highlight>

      </div>
    </div>
  );
};

export default CodeComponent;

//Yaha humne kya kiya hai ki , yaha humne pehle "npm install prism-react-render" .
//"prism-react-render" ek library hai jo code highlight and format karne me madad karti hai .
//Yaha humne sabse pehle ek div banaya jisme sab kuch render hoga .
//Uske baad prism-react-render hume ek propery deta hai which we call as <Highlight></Highlight>
//Toh uske humne kya kiya ki bataya ki code colouring kis "theme" ke according hogi , kis "code" ki coloring karni hai and code me kya "language" use kui hai ,
//Highlight yeh 3 parameters leta hai.
//Now ab humne Highlight ke andar humne ek function likha jo calcution yaani saara highlighing kaa kaam karke return karega .And as we used ()=>() this technique of function writing .Hence,auto return will happend , no need to write "return"
//now that function will take 4 parameters 
//style => yeh parameter is used to set that white box that we see and in which the code is wrapped .
//tokens => tokens are lines of code , each code line is called as token here
//getLineProps => yeh ek function hai jo token yaani puri ek line lega and use code pieces(line) me karke dega .
//getLineProps => yeh ek function hai jo phir un code pieces(which we say here as "line") and then unhe colorize karke dega .
//Toh humne ab us function ke andar .map() ka use karke ek function banaya toh kuch ese work karta hai
//Take a line(token) breaks it into codePieces(line) and then we give numbering to a each line through this {<span className="inline-block w-8 text-right mr-4 text-gray-600">{i + 1}</span>} and then one more .map which take those codePieces(line) one by one and colorize it and then again form a line with its numbering and return
//And then it showed up on the screen.
//So,collection of these all the lines help us show the full code on screen in slide 2?