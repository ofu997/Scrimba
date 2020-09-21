function succesfulPromise() {
  return new Promise((resolve, reject) => {
    resolve({ a: 'success' })
  })
}

function rejectedPromise() {
  return new Promise((resolve, reject) => {
    reject(new Error('here is error'))
  })
}

function pendingPromise() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => console.log('pending'), 1000)
    setTimeout(() => {
      clearInterval(interval)
      resolve('success after 4 seconds')
    }, 4000)
  })
}

(async function () {
  try {
    const result = await pendingPromise()
    console.log(result)

  } catch (err) {
    console.log(err)
  }
})();

// ----------------
// create a promise 
// wait for 4 seconds
// resolve or reject based on randomBool
// false - reject 'hero is on vacation'
// true - resolve 'batman is here'
const randomBool = Boolean(Math.round(Math.random())) // returns either 0 or 1 

function hero() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => console.log('finding hero'), 1000)
    setTimeout(() => {
      clearInterval(interval)
      if (randomBool) resolve('batman is here')
      else reject('hero is on vacation')
    }, 4000)
  })
}

setTimeout(() => {
  (async function () {
    try {
      const result = await hero()
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  })();
}, 5000);

// -------------------------------------------------------------
// A, B, C, won't execute becuase promiseStopper wins the race
const taskA = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res('a')
    }, 4000)
  })
} 
const taskB = ()=>{
  return new Promise((res)=>{
    setTimeout(()=>{
      res('b')
    },2000)
  })
}
const taskC = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res('c')
    }, 10000)
  })
}

const promiseStopper = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res('This is the fastest Promise.')
    }, 1500)
  })
}
 
setTimeout(() => {
  (async function () {
    try {
      const result = await Promise.race([taskA(), taskB(), taskC(), promiseStopper()])
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  })();
}, 10000)

// ------------------------------
// Promise.all();
const startTransaction = () => {
  return new Promise((res) => {
    setTimeout(() => {
      const date = new Date()
      console.log(`start transaction: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
      res(true)
    }, 5000)
  })
} 

const initPayment = () => {
  return new Promise((res) => {
    setTimeout(() => {
      const date = new Date()
      console.log(`init: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
      res(true)
    }, 1000)
  })
}

const launchVerification = () => {
  return new Promise((res) => {
    setTimeout(() => {
      const date = new Date()
      console.log(`launch verify: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
      res(true)
    }, 100)
  })
}

const performance = async (label) => {
  const date = new Date()      
  console.log(label, `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
}
  
setTimeout(() => {
  (async function () {
    try {
      await performance('start')
      const result = await Promise.all([startTransaction(), initPayment(), launchVerification()])
      await performance('end')
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  })();
}, 15000)