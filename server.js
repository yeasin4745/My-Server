let rateLimit=require('express-rate-limit');
let express=require('express')
let port=3000;

let app=express()

let limiter=rateLimit({
windowMs: 1*60*1000,
max:5,
message:'Too many request in home Route'
})



let limiter2=rateLimit({
windowMs: 1*60*1000,
max:5,
message:'Too many request in user route'
})


let homeReq=0,userReq=0;
//app.use(limiter)

app.get('/',limiter,(req,res)=>{
//res.send('Welcome back')
homeReq++;
res.end(`<h1>Your IP ${req.ip} Requesr number ${homeReq}</h1>`)
//console.log(req)

})


app.get('/user',limiter2,(req,res)=>{
userReq++;
res.send(`<h1>Welcome user route . Request no ${userReq}}</h1>`)

})






app.listen(port, () => {
  console.log('Server running on port ', port);
});
