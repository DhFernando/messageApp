//view controll ...

function dispalay(user) {
    if(user){
        document.getElementById("singInSection").style.display="none";
        document.getElementById("LoggedInSection").style.display="none";
        document.getElementById("SignIn").style.display="none";
        document.getElementById("logOut").style.display="block";
        document.getElementById("chatSection").style.display="block";
        
    }else{
       document.getElementById("singInSection").style.display="block";
       document.getElementById("LoggedInSection").style.display="block";
       document.getElementById("SignIn").style.display="block";
       document.getElementById("logOut").style.display="none";
       document.getElementById("chatSection").style.display="none";
    }

    document.querySelector("#chatInput").addEventListener('submit',(e)=>{

    })
}

var name;
var email;
var phoneNumber;
var uid;
function displayfireStoreData(user){
    if(user){
      db.collection('users').doc(user.uid).get().then((doc)=>{
        $('#userDtails').html(
          `<p class='text-secondary mb-0'>${doc.data().name} | ${user.email}</p>
            <p class='mt-0'>${doc.data().phoneNumber}<p/>
          `
        )
         name =doc.data().name;
         email = user.email;
         phoneNumber = doc.data().phoneNumber;
         uid=user.uid
        
      })
      
      db.collection('chat01').orderBy('time').onSnapshot(snapshot=>{
        var changes = snapshot.docChanges()
          changes.forEach(change => {
            //console.log(change.doc.data())
            if(change.type=='added'){
              renderUsers(change.doc,name,email,phoneNumber);
            }else if(change.type=='removed'){
              var id = '#'+change.doc.id;
              $(id).remove();
            }else if(change.type==='modified'){
              db.collection('users').doc(change.doc.id).get().then((doc)=>{
                var modifiedli = `
                name =>`+doc.data().name+ `<br>
                email=>`+doc.data().email+`<br>
                age=>`+doc.data().age+`
                <button onclick="removeUser('`+doc.id+`')" >Remove</button>
                <button onclick="updateUserFormDispaly('`+doc.id+`')" >Edit</button>`;
                id='#'+change.doc.id;
                $(id).html(modifiedli);
                
              })
            }
          });
      })
    }else{
      $('#userDtails').html(``)
      renderUsers(); 
    }
  }


//send Message
var form=document.querySelector('#chatInput');
form.addEventListener("submit",(e)=>{
    var time = new Date();
  e.preventDefault();
  db.collection("chat01").add({
      message:form.message.value,
      name:name,
      phoneNumber:phoneNumber,
      email:email,
      uid:uid,
      time: time
  })
  form.message.value=''

})

//displayData
function renderUsers(doc){
    if(doc){
        if(uid==doc.data().uid){
            var li = `<div id="`+doc.id+`" style='color:#0601ff;'>
                        <span style='font-size:10px' >you</span><br>
                        ${doc.data().message}
                    </div>`;
        }else{
            var li = `<div id="`+doc.id+`">
                        <span style='font-size:10px' >${doc.data().phoneNumber} ${doc.data().name}</span><br>
                        ${doc.data().message}
                    </div>`;
        } 
        $('#ulist').append(li);
    }else{
    var li = `<li>log first</li>`;
    $('#ulist').append(li);
    }   
  }