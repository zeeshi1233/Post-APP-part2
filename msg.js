import { app, auth, db, storage } from './firebas.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { setDoc, doc, query, where, onSnapshot, collection, addDoc, updateDoc,orderBy,getDocs,serverTimestamp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
let curuid;

const show_user = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        curuid = user.uid;
        const uid = user.uid;
        onSnapshot(collection(db, "users"), (data) => {
          data.docChanges().forEach((change) => {
            if (uid == change.doc.data().user) {
             localStorage.setItem("curId",uid)
             localStorage.setItem("CurentName",change.doc.data().name)
             localStorage.setItem("CurentuserPic",change.doc.data().pic)
              document.getElementById("name").innerHTML = change.doc.data().name
              if (change.doc.data().pic) {
                document.getElementById("pic").src = change.doc.data().pic
              }
              else {
                document.getElementById("user_pic").src = "download.jpg"
              }
             
              all(change.doc.data().email)
            }
  
          })
        });
  
      } else {
        window.location.href = "login.html"
      }
    });
  }
  show_user()



var sugUser;
async function all(email) {
  console.log(email);
  let alluser = document.getElementById("users");

  const q = query(collection(db, "users"), where("email", "!=", email));
  const onSnapshot = await getDocs(q);

  onSnapshot.forEach((change) => {
    const {name,pic,email,user}=change.data()

      if (change.data().pic) {
      sugUser = change.data().pic
    }
    else {
      sugUser = "download.jpg"
    }
    alluser.innerHTML += `
    <div class="pic_name" onclick="selected('${name}','${email}','${sugUser}','${user}')">
    <img src="${sugUser}" alt="" srcset="">
    <h5>${name}</h5>
    </div>
`
  })
};

let selectId;
 
window.selected=(name,email,pic,id)=>{
  selectId=id;
    const headname=document.getElementById("headname")
    const headpic=document.getElementById("headpic")
    var curId=localStorage.getItem("curId")
    console.log(curId);
    console.log(name,email,pic,id);
    headname.innerText=name
    if(pic){
    headpic.src=pic
}
else{
    headpic.src="download.jpg"
}

}

var text=document.getElementById("msg");
text.addEventListener("keydown",async(e)=>{
  if (e.keyCode===13) {
    var curId=localStorage.getItem("curId")
    let chatId;
    if(curId<selectId){
chatId=curId+selectId

}
else{
  chatId=selectId+curId
}
console.log(chatId,"chat Idd");

const docRef = await addDoc(collection(db, "messages"), {
msg:text.value,
chatId:chatId,
time:serverTimestamp()
});
console.log("msg Sent ", docRef.id);  



}
})

// CHmvYnqIrXQ9IclDTlV98hNMH8J2qIz7jfjmfVdduwd2ZA248zwHGJV2
