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
    console.log(user.createState)
    res.render("cityMaster.ejs",{name,state:user.createCity})
  })

  app.post("/createCity/create",async(req,res)=>{
    const name = req.body.name
    const user = await User.findOne({name})
    data = user.createState
    res.render("subCityMaster.ejs",{name,popup:false,data})
  })

  app.post("/createCity/create1", async(req,res)=>{
   const {name,stateNo,stateCode,country,cityName,state,pinCode} =req.body
   const user1 = await User.findOne({name})
   const user = await User.findOneAndUpdate({name},{ $push: {createCity:{stateNo,country,cityName,state,pinCode,stateCode}} },{ new: true })
   .then((doc)=>{
    data = user1.createState
     res.render("subCityMaster.ejs",{name,popup:true,data})
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

app.post("/createCategory/create",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
    data = user.createShedule
  res.render("subCategoryMaster.ejs",{name,popup:false,data})
})

app.post("/createCategory/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user1 = await User.findOne({name})
  const user = await User.findOneAndUpdate({name},{ $push: {createCategory:data} },{ new: true })
  .then((doc)=>{
    data = user1.createShedule
    res.render("subCategoryMaster.ejs",{name,popup:true,data})
  })
 })


//=================== Account Information ================

app.post("/createAccount",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("accountMaster.ejs",{name,state:user.createAccount})
})

app.post("/createAccount/create",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  shedule = user.createShedule
  state = user.createState
  group = user.createGroup
  category = user.createCategory
  res.render("subAccountMaster.ejs",{name,popup:false,shedule,state,group,category})
})

app.post("/createAccount/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user1 = await User.findOne({name})
  shedule = user1.createShedule
  state = user1.createState
  group = user1.createGroup
  category = user1.createCategory
  const user = await User.findOneAndUpdate({name},{ $push: {createAccount:data} },{ new: true })
  .then((doc)=>{
    res.render("subAccountMaster.ejs",{name,popup:true,shedule,state,group,category})
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


 //=================== Yarn Information ================

app.post("/createYarn",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  res.render("yarnMaster.ejs",{name,state:user.createYarn})
})

app.post("/createYarn/create",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  const blend = user.createBlend
  res.render("subYarnMaster.ejs",{name,popup:false,blend})
})

app.post("/createYarn/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user1 = await User.findOne({name})
  const blend = user1.createBlend
  const user = await User.findOneAndUpdate({name},{ $push: {createYarn:data} },{ new: true })
  .then((doc)=>{
    res.render("subYarnMaster.ejs",{name,popup:true,blend})
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

app.post("/createSpares/create",async(req,res)=>{
  const name = req.body.name
  const user = await User.findOne({name})
  const spares = user.createSparesGroup
  const spare = user.createSpares
  res.render("subSparesMaster.ejs",{name,popup:false,spares,spare})
})

app.post("/createSpares/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user1 = await User.findOne({name})
  const spares = user1.createSparesGroup
  const spare = user.createSpares
  const user = await User.findOneAndUpdate({name},{ $push: {createSpares:data} },{ new: true })
  .then((doc)=>{
    res.render("subSparesMaster.ejs",{name,popup:true,spares,spare})
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
  console.log(name)
  const user = await User.findOne({name})
  const hsn = user.createHsnCode
  const account = user.createAccount
  console.log( "account",account)
  res.render("purchaseOrder.ejs",{name,popup:false,hsn,account})
})

app.post("/createPurchaseOrder/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
 
  const user = await User.findOneAndUpdate({name},{ $push: {createPurchaseOrder:data} },{ new: true })
  .then((doc)=>{
    console.log("saved")
  })
 })

//=================== Purchase Gray Information ================

app.post("/createPurchaseOrderGray",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const hsn = user.createHsnCode
  const account = user.createAccount
  res.render("purchaseOrderGray.ejs",{name,popup:false,hsn,account})
})

app.post("/createPurchaseOrderGray/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
 
  const user = await User.findOneAndUpdate({name},{ $push: {createPurchaseOrderGray:data} },{ new: true })
  .then((doc)=>{
    console.log("saved")
  })
 })


 //=================== Purchase Yarn Information ================

app.post("/createPurchaseOrderYarn",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const yarn = user.createYarn
  const hsn = user.createHsnCode
  const account = user.createAccount
  res.render("purchaseOrderYarn.ejs",{name,popup:false,hsn,yarn,account})
})

app.post("/createPurchaseOrderYarn/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
 
  const user = await User.findOneAndUpdate({name},{ $push: {createPurchaseOrderYarn:data} },{ new: true })
  .then((doc)=>{
    console.log(doc)
  })
 })


 //=================== Fabric ================

app.post("/fabric",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const fabric = user.createPurchaseOrder
  res.render("fabric.ejs",{name,popup:false,fabric})
})

app.post("/fabric/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const data = user.createPurchaseOrder
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
    }
  }
  const {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  res.render("subFabric.ejs",{discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges})
 })

 app.post("/fabric/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data,name)
 
  const user = await User.findOneAndUpdate({name},{ $push: {fabric:data} },{ new: true })
  .then((doc)=>{
    console.log("saved")
  })
 })


  //=================== Gray ================

app.post("/gray",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const gray = user.createPurchaseOrderGray
  res.render("gray.ejs",{name,popup:false,gray})
})

app.post("/gray/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const data = user.createPurchaseOrderGray
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
    }
  }
  const {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  res.render("subGray.ejs",{name,tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges,poNumber})
 })

 app.post("/gray/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data,name)
 
  const user = await User.findOneAndUpdate({name},{ $push: {gray:data} },{ new: true })
  .then((doc)=>{
    console.log("saved")
  })
 })


  //=================== yarn ================

app.post("/yarn",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const yarn = user.createPurchaseOrderYarn
  res.render("yarn.ejs",{name,popup:false,yarn})
})

app.post("/yarn/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const data = user.createPurchaseOrderYarn
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
    }
  }
  const {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  res.render("subYarn.ejs",{name,tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges,poNumber})
 })

 app.post("/yarn/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data,name)
 
  const user = await User.findOneAndUpdate({name},{ $push: {yarn:data} },{ new: true })
  .then((doc)=>{
    console.log("saved")
  })
 })

 
 //================== server =====================


app.listen(3000,()=>{
    console.log("server started")
})