import { initializeApp } from "firebase/app";
import {getFirestore,collection,addDoc,getDocs,deleteDoc,doc,query,orderBy,limit,} from "firebase/firestore";
//Sabse pehle humne "firebase.ts" banaya and then "npm install firebase" kiya . Uske baad humne jo-jo need thi use humne import kiya.To read more about each function go to Case105 in Readme.md 

// 🔹 Firebase config from .env to set up the client to initialize the Client for calling firebase.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// 🔹 Check if config exists , yaani humne check kiya kya Client banane ke liye config sahi hai ki nahi and this Object.values(firebaseConfig).every(Boolean) checks firebaseconfig and if everything is alright then return true or false on the basis of that.
const isConfigured = Object.values(firebaseConfig).every(Boolean);

// 🔹 Initialize Firebase safely . Yaani agar Configure details sahi hai , yaani true aaya hai toh yeh karo initializeApp(firebaseConfig) . Yeh kya karega sabhi configuration lega and hume client banakar dega , jisse hum firebase se baat kar sakte hai , abhi bhi hum firestore se baat nahi kar sakte hai , abhi sirf hum firebase se baat kar sakte hai and firebse have tons of things not only "firestore".So, we created the client and saved it in variable "const". 
const app = isConfigured ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;
// 🔹 Uske baad humne check kiya ki client ban gaya hai ki nahi , If yes then we do this getFirestore(app) jisse kya hoga ab hume phir se ek aur client milega in return , jisse ab hum firestore se baat kar sakte hai and is client ko hum "db" me store kar denge .

// 🔹 Collection name .
const COLLECTION_NAME = "components";

// ✅ Check Firebase ready again
export const isFirebaseConfigured = () => isConfigured;


type Prop = {
  prompt: string,
  code: string,
  title: string
}


// ✅ CREATE (save component) . 
export const saveComponent = async ({prompt,code,title}:Prop) => {
  if (!db) {
    throw new Error("Firebase not configured");
  }

const data = {
  prompt,
  code,
  title,
  createdAt: Date.now(),
};

const docRef = await addDoc(collection(db, COLLECTION_NAME), data);

  return {
    id: docRef.id,
    ...data,
  };
};
// USKE BAAD HUMNE EK ROUTE OR WE CAN SAY IT AS FUNCTION BANA DIYA WHICH WHEN WE CALL TOH KYA HOGA |Pehle check hoga ki db me Client hai ki nahi , If hai then we move on and then we create the document in the collection or folder and then we returned same like as we do in Mongo Db .


type ComponentType = {
  id: string;
  prompt: string;
  code: string;
  title: string;
  createdAt: number;
};


// ✅ READ (get components)
export const listComponents = async () => {
  if (!db) {
   throw new Error("Firebase not configured");
  }

  const q = query(
    collection(db, COLLECTION_NAME), //yaani using db(client) from COLLECTION_NAME("components")
    orderBy("createdAt", "desc"), //On basis of created at and in descending order .
    limit(50) //max limit
  );

  const snapshot = await getDocs(q);//sanpshot.docs is where the array of data is not in snapshot but in snapshot.docs

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }))as ComponentType[];//why we used the map ?In Case105 see Readme.md Because firebase gives like this [doc1]
};
//Similiarly, we created the Fetch function jise jab hum call karenge then it will take out array of data 





// ✅ DELETE
export const deleteComponent = async (id: string) => {
  if (!db){
    throw new Error("Firebase not configured");
  }

  await deleteDoc(doc(db, COLLECTION_NAME, id));
};
//Similiarly, we created the delete function which onCall deletes the required data.





//After doing this setup in this file firebase.ts , we have gone to Slide 2 do do these things
//HUMNE PEHLE SAVE BUTTON KO EK FUNCTION SE CONNECT KIYA MEANS WHEN WE CLICK SAVE THEN THIS FUNCTION WILL GET CALLED --> function handleSaveComponentClick
//USKE BAAD HUMNE EK AUR SETUP KIYA KI USEEFFECT LAGAYA , KI JAISE HI LOAD KARE PAGE TAB FETCHFUNCTION CALL HO JAAYE AND HUME GALLERY TAB ME PURI HISTORY DIKH JAAYE JO JO SAVE HUA HAI FIREBASE ME .