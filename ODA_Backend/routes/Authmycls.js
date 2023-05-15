const express=require("express");
const jwt=require("jsonwebtoken");
const router=express.Router();
const Member=require("../model/member");
const bcrypt=require("bcrypt");
router.post("/reg",async (req,res)=>{

   // var ck=await Member.find({email:req.body.email});
console.log(req.body)
    const salt=await bcrypt.genSalt(10);
    const hashpass=await bcrypt.hash(req.body.password,salt);

 
 var insobj={
    name:req.body.name,
    email:req.body.email,
    password:hashpass,

 };
 await Member.create(insobj);
  
    res.json({msg:"Signup done"});

});



router.post("/login",async (req,res)=>{

    var e=req.body.email;
    var p=req.body.password;
    var data=await Member.findOne({email:e});

    if(data!=null){
        
        bcrypt.compare(p,data.password,async (err,result)=>{
            if(err){
                res.json({msg:"Invalid login"});
            }else{
              if(result==true){
                var udata={
                    name:data.name,
                    email:data.email,
                    id:data._id
                };
                var token=await jwt.sign(udata,"mykey");
                res.json({jtoken:token});

              }else{
                res.json({msg:"Invalid login"});
              }
            }
        })


    }else{
        res.json({msg:"Invalid login"});
    }
});


router.get("/getu",ufun,async (req,res)=>{

    jwt.verify(req.token,"mykey",(err,ud)=>{
        if(err){
            res.json({msg:"Invalid"});
        }else{
             res.json(ud);
        }
    })

});

function ufun(req,res,next){

    var ft=req.headers.authorization;
    if(typeof ft!="undefined"){
       var tkn=ft.split(" ");
       req.token=tkn[1];
       next();

    }else{
        res.json({msg:"Invalid"});
    }
   
}

module.exports=router;



