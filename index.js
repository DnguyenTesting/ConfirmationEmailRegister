const express=require('express');
const nodemailer=require('nodemailer');
const path=require('path');
const app=express();
const port=process.env.PORT || 3000;
const jwt=require('jsonwebtoken');


let transporter=nodemailer.createTransport('smtps://phuduong293%40gmail.com:phuduong2931992@smtp.gmail.com');




app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{

    //register done 


    const token=jwt.sign({data:{
        name:"Duong nguyen",
        email:"duongnguyen@gmail.com",
        username:"duongnguyen"
    }},"ok",{
        expiresIn:604800 //1 week
    });
    res.json({
        success:true,
        token: token,
    });
    //send email
    var mailOptions = {
        from: '"Duong Nguyen" <phuduong293@gmail.com>', // sender address
        to: 'phuduong290392@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plaintext body
        html: `<p>Click this to active your account <a href='http://localhost:3000/authenticate/${token}'>http://localhost:3000/authenticate/${token}</a></p>` // html body
    };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        //email sending
    });
    
    
});
app.get('/authenticate/:token',(req,res)=>{
    let token=req.params.token;
    jwt.verify(token,"ok",(err,result)=>{
        console.log(result);
        // if not err. add user to database and now can login.
    });
    let decoded=jwt.decode(token,{complete:true});
    res.send(decoded.payload);
});
app.listen(port,(err)=>{
    if(err) throw err;
    console.log('listening on port '+port);
})