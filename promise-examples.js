function succesfulPromise(){
    return new Promise((resolve,reject)=>{
        resolve({a:'success'})
    })
}

function rejectedPromise(){
    return new Promise((resolve,reject)=>{
        reject(new Error('here is error'))
    })
}

function pendingPromise(){
    return new Promise((resolve,reject)=>{
        const interval = setInterval(()=>console.log('pending'),1000)
        setTimeout(()=>{
            clearInterval(interval)
            resolve('success after 4 seconds')
        },4000)
    })
}

(async function() {
    try{
        const result = await pendingPromise()
        console.log(result)
        
    }catch(err){
        console.log(err)
    }
})();

// create a promise 
// wait for 4 seconds
// resolve or reject based on randomBool
// false - reject 'hero is on vacation'
// true - resolve 'batman is here'
const randomBool = Boolean(Math.round(Math.random())) // returns either 0 or 1 

function hero() {
    return new Promise((resolve, reject) => {
        const interval = setInterval(()=>console.log('finding hero'), 1000)
        setTimeout(()=>{
            clearInterval(interval)
            if (randomBool) resolve('batman is here')
            else reject('hero is on vacation')
        }, 4000)
    })
}

(async function() {
    try{
        const result = await hero()
        console.log(result)   
    }catch(err){
        console.log(err)
    }
})();