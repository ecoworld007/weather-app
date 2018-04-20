let getUser = (id,callback)=>{
    let user = {
        name:'Himanshu Negi',
        age: 25
    }
    setTimeout(()=>{
        callback(user);
    },3000);
}

getUser(31,(user)=>{
    console.log(user);
})