const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require("./database/userAccount");
const { findOne } = require("./database/userAccount");
const path = require('path');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/accountingSoft');
}


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get("/", async(req,res)=>{
  const user = await User.find()
  res.render("home.ejs",{user})
})

app.get("/createCompany",(req,res)=>{
    res.render("createCompany.ejs")
})

app.post("/createCompany",async(req,res)=>{
  const data = req.body
  const user = new User(data)
  await user.save()
  console.log("create company",data)
  res.redirect("/createCompany")
})

app.get("/login/:name",(req,res)=>{
    const {name} = req.params
    res.render("login.ejs",{name})
})

app.post("/login",async(req,res)=>{
  const details = req.body
  if(details.username==="admin" && details.password === 'admin'){
        const user = await User.findOne({name:details.name})
        res.render("stateMaster.ejs",{name: details.name,state:user.createState})
  }
})

// ================= State Information =========================

app.post("/createState", async(req,res)=>{
  const data = req.body.name
    res.render("subStateMaster.ejs",{name:data,popup:false})
//   const user = await User.findOneAndUpdate({name:data[0].companyName},{ $push: {createState:update} },{ new: true })
//   .then((doc)=>{if(doc){
//     res.json(true)
//   }})
})

app.post("/subStateCreate",async(req,res)=>{
    console.log("substate",req.body)
    const name = req.body.name
    const gstStateCode = req.body.gstStateCode
    const stateCode = req.body.stateCode
    const stateName = req.body.stateName
    const user = await User.findOneAndUpdate({name},{ $push: {createState:{stateCode,stateName,gstStateCode}} },{ new: true })
    .then((doc)=>{
      res.render("subStateMaster.ejs",{name,popup:true})
    })
  })

  app.post("/createStatee",async(req,res)=>{
    const name = req.body.name
    console.log("name",name)
    const user = await User.findOne({name})
    console.log("state",user.createState)
    if(user.createState){
      res.render("stateMaster.ejs",{name,state:user.createState})
    }
  })


  //=================== City Information ================

  app.post("/createCity",async(req,res)=>{
    const name = req.body.name
    const user = await User.findOne({name})
    res.render("cityMaster.ejs",{name,state:user.createCity})
  })

  app.post("/createState/create",(req,res)=>{
    const name = req.body.name
    res.render("subCityMaster.ejs",{name,popup:false})
  })

  app.post("/createState/create1", async(req,res)=>{
   const {name,stateNo,stateCode,country,cityName,state,pinCode} =req.body
   const user = await User.findOneAndUpdate({name},{ $push: {createCity:{stateNo,country,cityName,state,pinCode,stateCode}} },{ new: true })
   .then((doc)=>{
     res.render("subCityMaster.ejs",{name,popup:true})
   })
  })

//=================== HSN Code Information ================

app.post("/createHsnCode",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("hsnCodeMaster.ejs",{name,state:user.createHsnCode})
})

app.post("/createHsnCode/create",(req,res)=>{
  const name = req.body.name
  res.render("subHsnCodeMaster.ejs",{name,popup:false})
})

app.post("/createHsnCode/create1", async(req,res)=>{
  const {name,hsnCode,description,gstRate} = req.body
  const user = await User.findOneAndUpdate({name},{ $push: {createHsnCode:{hsnCode,description,gstRate}} },{ new: true })
  .then((doc)=>{
    res.render("subHsnCodeMaster.ejs",{name,popup:true})
  })
 })

//=================== Loom Information ================


app.post("/createLoom",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("loomMaster.ejs",{name,state:user.createLoom})
})

app.post("/createLoom/create",(req,res)=>{
  const name = req.body.name
  res.render("subLoomMaster.ejs",{name,popup:false})
})

app.post("/createLoom/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  const user = await User.findOneAndUpdate({name},{ $push: {createLoom:data} },{ new: true })
  .then((doc)=>{
    res.render("subLoomMaster.ejs",{name,popup:true})
  })
 })

//=================== Flange Information ================

app.post("/createFlange",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("flangeMaster.ejs",{name,state:user.createFlange})
})

app.post("/createFlange/create",(req,res)=>{
  const name = req.body.name
  res.render("subFlangeMaster.ejs",{name,popup:false})
})

app.post("/createFlange/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  const user = await User.findOneAndUpdate({name},{ $push: {createFlange:data} },{ new: true })
  .then((doc)=>{
    res.render("subFlangeMaster.ejs",{name,popup:true})
  })
 })


//=================== Godown Information ================

app.post("/createGodown",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("godownMaster.ejs",{name,state:user.createGodown})
})

app.post("/createGodown/create",(req,res)=>{
  const name = req.body.name
  res.render("subGodownMaster.ejs",{name,popup:false})
})

app.post("/createGodown/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  const user = await User.findOneAndUpdate({name},{ $push: {createGodown:data} },{ new: true })
  .then((doc)=>{
    res.render("subGodownMaster.ejs",{name,popup:true})
  })
 })

//=================== Yarn Mill Information ================

app.post("/createYarnMill",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("yarnMillMaster.ejs",{name,state:user.createYarnMill})
})

app.post("/createYarnMill/create",(req,res)=>{
  const name = req.body.name
  res.render("subYarnMillMaster.ejs",{name,popup:false})
})

app.post("/createYarnMill/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createYarnMill:data} },{ new: true })
  .then((doc)=>{
    res.render("subYarnMillMaster.ejs",{name,popup:true})
  })
 })

//=================== Shedule Information ================

app.post("/createShedule",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("sheduleMaster.ejs",{name,state:user.createShedule})
})

app.post("/createShedule/create",(req,res)=>{
  const name = req.body.name
  res.render("subSheduleMaster.ejs",{name,popup:false})
})


app.post("/createShedule/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createShedule:data} },{ new: true })
  .then((doc)=>{
    res.render("subSheduleMaster.ejs",{name,popup:true})
  })
 })

//=================== Group Information ================

app.post("/createGroup",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("groupMaster.ejs",{name,state:user.createGroup})
})

app.post("/createGroup/create",(req,res)=>{
  const name = req.body.name
  res.render("subGroupMaster.ejs",{name,popup:false})
})

app.post("/createGroup/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createGroup:data} },{ new: true })
  .then((doc)=>{
    res.render("subGroupMaster.ejs",{name,popup:true})
  })
 })

//=================== Cateogory Information ================

app.post("/createCategory",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("categoryMaster.ejs",{name,state:user.createCategory})
})

app.post("/createCategory/create",(req,res)=>{
  const name = req.body.name
  res.render("subCategoryMaster.ejs",{name,popup:false})
})

app.post("/createCategory/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createCategory:data} },{ new: true })
  .then((doc)=>{
    res.render("subCategoryMaster.ejs",{name,popup:true})
  })
 })


//=================== Account Information ================

app.post("/createAccount",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("accountMaster.ejs",{name,state:user.createAccount})
})

app.post("/createAccount/create",(req,res)=>{
  const name = req.body.name
  res.render("subAccountMaster.ejs",{name,popup:false})
})

app.post("/createAccount/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createAccount:data} },{ new: true })
  .then((doc)=>{
    res.render("subAccountMaster.ejs",{name,popup:true})
  })
 })


//=================== Bank Information ================

app.post("/createBank",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("bankMaster.ejs",{name,state:user.createBank})
})

app.post("/createBank/create",(req,res)=>{
  const name = req.body.name
  res.render("subBankMaster.ejs",{name,popup:false})
})

app.post("/createBank/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createBank:data} },{ new: true })
  .then((doc)=>{
    res.render("subBankMaster.ejs",{name,popup:true})
  })
 })


 //=================== Bank Information ================

app.post("/createYarn",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("yarnMaster.ejs",{name,state:user.createYarn})
})

app.post("/createYarn/create",(req,res)=>{
  const name = req.body.name
  res.render("subYarnMaster.ejs",{name,popup:false})
})

app.post("/createYarn/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createYarn:data} },{ new: true })
  .then((doc)=>{
    res.render("subYarnMaster.ejs",{name,popup:true})
  })
 })

 //=================== Blend Information ================

app.post("/createBlend",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("blendMaster.ejs",{name,state:user.createBlend})
})

app.post("/createBlend/create",(req,res)=>{
  const name = req.body.name
  res.render("subBlendMaster.ejs",{name,popup:false})
})

app.post("/createBlend/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createBlend:data} },{ new: true })
  .then((doc)=>{
    res.render("subBlendMaster.ejs",{name,popup:true})
  })
 })


  //=================== Spares Group Information ================

app.post("/createSparesGroup",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("sparesGroupMaster.ejs",{name,state:user.createSparesGroup})
})

app.post("/createSparesGroup/create",(req,res)=>{
  const name = req.body.name
  res.render("subSparesGroupMaster.ejs",{name,popup:false})
})

app.post("/createSparesGroup/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createSparesGroup:data} },{ new: true })
  .then((doc)=>{
    res.render("subSparesGroupMaster.ejs",{name,popup:true})
  })
 })

   //=================== Spares Information ================

app.post("/createSpares",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("sparesMaster.ejs",{name,state:user.createSpares})
})

app.post("/createSpares/create",(req,res)=>{
  const name = req.body.name
  res.render("subSparesMaster.ejs",{name,popup:false})
})

app.post("/createSpares/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createSpares:data} },{ new: true })
  .then((doc)=>{
    res.render("subSparesMaster.ejs",{name,popup:true})
  })
 })

    //=================== Weave Information ================

app.post("/createWeave",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("weaveMaster.ejs",{name,state:user.createWeave})
})

app.post("/createWeave/create",(req,res)=>{
  const name = req.body.name
  res.render("subWeaveMaster.ejs",{name,popup:false})
})

app.post("/createWeave/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createWeave:data} },{ new: true })
  .then((doc)=>{
    res.render("subWeaveMaster.ejs",{name,popup:true})
  })
 })


 //=================== Weave Information ================

app.post("/createYarnMillName",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("yarnMillNameMaster.ejs",{name,state:user.createYarnMillName})
})

app.post("/createYarnMillName/create",(req,res)=>{
  const name = req.body.name
  res.render("subYarnMillNameMaster.ejs",{name,popup:false})
})

app.post("/createYarnMillName/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createYarnMillName:data} },{ new: true })
  .then((doc)=>{
    res.render("subYarnMillNameMaster.ejs",{name,popup:true})
  })
 })


  //=================== Purchase Information ================

app.post("/createPurchaseOrder",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("purchaseOrder.ejs",{name})
})

app.post("/createPurchaseOrder/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  // const user = await User.findOneAndUpdate({name},{ $push: {createYarnMillName:data} },{ new: true })
  // .then((doc)=>{
  //   res.render("subYarnMillNameMaster.ejs",{name,popup:true})
  // })
 })


 //================== server =====================

app.listen(3000,()=>{
    console.log("server started")
})