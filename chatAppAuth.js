//user Status
auth.onAuthStateChanged(user =>{
    if(user){
        console.log('loggedIn')  
        dispalay(user) ;
        displayfireStoreData(user);
    }else{
        console.log('loggedOut')
        dispalay(user) ;
        displayfireStoreData(user);
    }
})

//sign up user
document.querySelector("#singIn").addEventListener('submit',(e)=>{
    e.preventDefault();
    
    var email = $("#SingInEmail").val();
    var password = $("#SingInPassword").val()

    auth.createUserWithEmailAndPassword(email,password).then(cred=>{
        return db.collection('users').doc(cred.user.uid).set({
            name: $("#name").val(),
            phoneNumber: $("#phoneNumber").val()
        });
    }).then(()=>{
        document.querySelector("#singIn").reset();
    })

})

// signOut
document.querySelector('#logOut').addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{  

    });
})

// LoggedIn
document.querySelector('#LoggedIn').addEventListener('submit',(e)=>{
    e.preventDefault();
    var email = $("#LogInEmail").val();
    var password = $("#LogInPassword").val()

    auth.signInWithEmailAndPassword(email,password).then(cred=>{
        // console.log(cred)
        document.querySelector("#LoggedIn").reset();
    })
})
