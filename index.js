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
        res.render("dashBoard.ejs",{name: details.name,state:user.createState})
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
  res.render("subSparesMaster.ejs",{name,popup:false,spares})
})

app.post("/createSpares/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user1 = await User.findOne({name})
  const spares = user1.createSparesGroup
  const user = await User.findOneAndUpdate({name},{ $push: {createSpares:data} },{ new: true })
  .then((doc)=>{
    res.render("subSparesMaster.ejs",{name,popup:true,spares})
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
  let no = 0
  if(user.createPurchaseOrder){
     no = +user.createPurchaseOrder.length + 1
    }
  res.render("purchaseOrder.ejs",{name,popup:false,hsn,account,no})
})

app.post("/createPurchaseOrder/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
  const user = await User.findOneAndUpdate({name},{ $push: {createPurchaseOrder:data} },{ new: true })
  data.grandTotal = 0
  const userUpdated = await User.findOneAndUpdate({name},{ $push: {fabricUpdated:data} },{ new: true })
 })

//=================== Purchase Gray Information ================

app.post("/createPurchaseOrderGray",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const hsn = user.createHsnCode
  const account = user.createAccount
  let no = 0
  if(user.createPurchaseOrderGray){
     no = +user.createPurchaseOrderGray.length + 1
    }
  res.render("purchaseOrderGray.ejs",{name,popup:false,hsn,account,no})
})

app.post("/createPurchaseOrderGray/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
 
  const user = await User.findOneAndUpdate({name},{ $push: {createPurchaseOrderGray:data} },{ new: true })
  data.grandTotal = 0
  const userUpdated = await User.findOneAndUpdate({name},{ $push: {grayUpdated:data} },{ new: true })
 })


 //=================== Purchase Yarn Information ================

app.post("/createPurchaseOrderYarn",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const yarn = user.createYarn
  const hsn = user.createHsnCode
  const account = user.createAccount
  let no = 0
  const mill = user.createYarnMillName
  if(user.createPurchaseOrderYarn){
     no = +user.createPurchaseOrderYarn.length + 1
    }
  res.render("purchaseOrderYarn.ejs",{name,popup:false,hsn,yarn,account,no,mill})
})

app.post("/createPurchaseOrderYarn/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
 
  const user = await User.findOneAndUpdate({name},{ $push: {createPurchaseOrderYarn:data} },{ new: true })
  data.grandTotal = 0
  const userUpdated = await User.findOneAndUpdate({name},{ $push: {yarnUpdated:data} },{ new: true })
 })


  //=================== Purchase Spare Information ================

app.post("/createPurchaseOrderSpare",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const spare = user.createSpares
  const hsn = user.createHsnCode
  const account = user.createAccount
  let no = 0
  if(user.createPurchaseOrderSpare){
     no = +user.createPurchaseOrderSpare.length + 1
    }
  res.render("purchaseOrderSpare.ejs",{name,popup:false,hsn,spare,account,no})
})

app.post("/createPurchaseOrderSpare/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
 
  const user = await User.findOneAndUpdate({name},{ $push: {createPurchaseOrderSpare:data} },{ new: true })
  data.grandTotal = 0
  const userUpdated = await User.findOneAndUpdate({name},{ $push: {spareUpdated:data} },{ new: true })
 })


 //=================== Fabric ================

app.post("/fabric",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const data = user.createPurchaseOrder
  let fabric = []
  for(let x = 0;x<data.length;x++){
    fabric.push(data[x].partyName)
  } 

  let uniqueFabric = fabric.filter((c, index) => {
    return fabric.indexOf(c) === index;
});

  res.render("fabricPo.ejs",{name,popup:false,uniqueFabric})
})

app.post("/fabric/po",async(req,res)=>{
  const {name, partyName} = req.body
  const user = await User.findOne({name})
  const fabric = user.createPurchaseOrder
  let fabric1 = []
  for(let x = 0;x<fabric.length;x++){
    fabric1.push(fabric[x].partyName)
  } 

  let uniqueFabric = fabric1.filter((c, index) => {
    return fabric1.indexOf(c) === index;
});

  // const user1 = await User.findOne({name},{createPurchaseOrder:{$elemMatch:{partyName,orderCompleted:"no"}}})
  const data = user.createPurchaseOrder
  const po = []
  for(let x=0;x<data.length;x++){
    if(data[x].partyName === partyName && data[x].orderCompleted === "no"){
      po.push(data[x].poNumber)
    }
  }
  console.log(partyName,po)
  res.render("fabric.ejs",{name,partyName,po,popup:false,uniqueFabric})
})

app.post("/fabric/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const fabric = user.fabricUpdated
  const data = user.fabricUpdated
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
      console.log(poNumber,data[x].poNumber)
    }
  }
  const main = await User.findOne({name},{createPurchaseOrder:{$elemMatch:{poNumber}}})
  const t1 = main.createPurchaseOrder[0].tableData
  const remain = []
  
  
  let {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  console.log("otherCharges",otherCharges)
  
  for(let x=0;x<t1.length;x++){
    if(t1[x]?.[1] - +tableData[x]?.[1] == 0){
      remain.push(t1[x]?.[1])
    }else{remain.push(t1[x]?.[1] - +tableData[x]?.[1])}
  }
  res.render("subFabric.ejs",{remain,fabric,discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges})
 })

 app.post("/fabric/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
 const po = data.poNumber
  const user = await User.findOneAndUpdate({name},{ $push: {fabric:data} },{ new: true })
  const user1 = await User.findOneAndUpdate({name,"fabricUpdated.poNumber": po},{$set:{"fabricUpdated.$":data}})
  const oldData = await User.findOne({name},{createPurchaseOrder:{$elemMatch:{poNumber:po}}})
  const fabric = await User.findOne({name}) 
  const a = fabric.fabric
  let total = 0
  for(let x=0;x<a.length;x++){
    if(a[x].poNumber===po){
      for(let y=0;y<a[x].tableData.length;y++){
        const tableValue = a[x].tableData[y]?.[1]
        total = total + +tableValue
      }
    }
  }

  let mainTotal = 0
  for(let x=0;x<oldData.createPurchaseOrder[0].tableData.length;x++){
    const tableValue = oldData.createPurchaseOrder[0].tableData[x]?.[1]
    mainTotal = mainTotal + +tableValue
  }


  if(mainTotal === total){
    console.log("delete")
    const updateData = await User.findOneAndUpdate({name,"createPurchaseOrder.poNumber":po},{$set:{"createPurchaseOrder.$.orderCompleted":"yes"}})
    const deleteData = await User.findOneAndUpdate({name,"fabricUpdated.poNumber": po},{$pull:{fabricUpdated:{poNumber:po}}})
  }
 })


  //=================== Gray ================
app.post("/gray",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const data = user.createPurchaseOrderGray
  let gray = []
  for(let x = 0;x<data.length;x++){
    gray.push(data[x].partyName)
  } 

  let uniqueGray = gray.filter((c, index) => {
    return gray.indexOf(c) === index;
});

  res.render("grayPo.ejs",{name,popup:false,uniqueGray})
})


app.post("/gray/po",async(req,res)=>{
  const {name, partyName} = req.body
  const user = await User.findOne({name})
  const gray = user.createPurchaseOrderGray
  let gray1 = []
  for(let x = 0;x<gray.length;x++){
    gray1.push(gray[x].partyName)
  } 

  let uniqueGray = gray1.filter((c, index) => {
    return gray1.indexOf(c) === index;
});

  // const user1 = await User.findOne({name},{createPurchaseOrder:{$elemMatch:{partyName,orderCompleted:"no"}}})
  const data = user.createPurchaseOrderGray
  const po = []
  for(let x=0;x<data.length;x++){
    if(data[x].partyName === partyName && data[x].orderCompleted === "no"){
      po.push(data[x].poNumber)
    }
  }
  console.log(partyName,po)
  res.render("gray.ejs",{name,partyName,po,popup:false,uniqueGray})
})

app.post("/gray/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const fabric = user.grayUpdated
  const data = user.grayUpdated
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
      console.log(poNumber,data[x].poNumber)
    }
  }
  const main = await User.findOne({name},{createPurchaseOrderGray:{$elemMatch:{poNumber}}})
  const t1 = main.createPurchaseOrderGray[0].tableData
  const remain = []
  
  
  let {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  
  for(let x=0;x<t1.length;x++){
    if(t1[x]?.[1] - +tableData[x]?.[1] == 0){
      remain.push(t1[x]?.[1])
    }else{remain.push(t1[x]?.[1] - +tableData[x]?.[1])}
  }
  res.render("subGray.ejs",{remain,fabric,discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges}) })

 app.post("/gray/create1", async(req,res)=>{
  console.log("right")
  const {name} = req.body
  const data = req.body
  delete data.name
 const po = data.poNumber
  const user = await User.findOneAndUpdate({name},{ $push: {gray:data} },{ new: true })
  const user1 = await User.findOneAndUpdate({name,"grayUpdated.poNumber": po},{$set:{"grayUpdated.$":data}})
  const oldData = await User.findOne({name},{createPurchaseOrderGray:{$elemMatch:{poNumber:po}}})
 
  const gray = await User.findOne({name}) 
  const a = gray.gray
  let total = 0
  for(let x=0;x<a.length;x++){
    if(a[x].poNumber===po){
      for(let y=0;y<a[x].tableData.length;y++){
        const tableValue = a[x].tableData[y]?.[1]
        total = total + +tableValue
      }
    }
  }

  let mainTotal = 0
  for(let x=0;x<oldData.createPurchaseOrderGray[0].tableData.length;x++){
    const tableValue = oldData.createPurchaseOrderGray[0].tableData[x]?.[1]
    mainTotal = mainTotal + +tableValue
  }


  if(mainTotal === total){
    const updateData = await User.findOneAndUpdate({name,"createPurchaseOrderGray.poNumber":po},{$set:{"createPurchaseOrderGray.$.orderCompleted":"yes"}})
    const deleteData = await User.findOneAndUpdate({name,"grayUpdated.poNumber": po},{$pull:{grayUpdated:{poNumber:po}}})
  }
 })


  //=================== yarn ================

app.post("/yarn",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const data = user.createPurchaseOrderYarn
  let yarn = []
  for(let x = 0;x<data.length;x++){
    yarn.push(data[x].partyName)
  }
  let uniqueYarn = yarn.filter((c, index) => {
    return yarn.indexOf(c) === index;
});
  res.render("yarnPo.ejs",{name,popup:false,yarn,uniqueYarn})
})

app.post("/yarn/po",async(req,res)=>{
  const {name, partyName} = req.body
  const user = await User.findOne({name})
  const yarn = user.createPurchaseOrderYarn
  let yarn1 = []
  for(let x = 0;x<yarn.length;x++){
    yarn1.push(yarn[x].partyName)
  } 

  let uniqueYarn = yarn1.filter((c, index) => {
    return yarn1.indexOf(c) === index;
});

  // const user1 = await User.findOne({name},{createPurchaseOrderYarn:{$elemMatch:{partyName,orderCompleted:"no"}}})
  const data = user.createPurchaseOrderYarn
  const po = []
  for(let x=0;x<data.length;x++){
    if(data[x].partyName === partyName && data[x].orderCompleted === "no"){
      po.push(data[x].poNumber)
    }
  }
  console.log(partyName,po)
  res.render("yarn.ejs",{name,partyName,po,popup:false,uniqueYarn})
})

app.post("/yarn/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const yarn = user.yarnUpdated
  const data = user.yarnUpdated
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
      console.log(poNumber,data[x].poNumber)
    }
  }
  const main = await User.findOne({name},{createPurchaseOrderYarn:{$elemMatch:{poNumber}}})
  const t1 = main.createPurchaseOrderYarn[0].tableData
  const remain = []
  
  
  let {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  
  for(let x=0;x<t1.length;x++){
    if(t1[x]?.[1] - +tableData[x]?.[1] == 0){
      remain.push(t1[x]?.[1])
    }else{remain.push(t1[x]?.[1] - +tableData[x]?.[1])}
  }
  res.render("subYarn.ejs",{remain,yarn,discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges})
 })

 app.post("/yarn/create1", async(req,res)=>{
  console.log("come")
  const {name} = req.body
  const data = req.body
  delete data.name
 const po = data.poNumber
  const user = await User.findOneAndUpdate({name},{ $push: {yarn:data} },{ new: true })
  const user1 = await User.findOneAndUpdate({name,"yarnUpdated.poNumber": po},{$set:{"yarnUpdated.$":data}})
  const oldData = await User.findOne({name},{createPurchaseOrderYarn:{$elemMatch:{poNumber:po}}})
  const yarn = await User.findOne({name}) 
  const a = yarn.yarn
  let total = 0
  for(let x=0;x<a.length;x++){
    if(a[x].poNumber===po){
      for(let y=0;y<a[x].tableData.length;y++){
        const tableValue = a[x].tableData[y]?.[1]
        total = total + +tableValue
      }
    }
  }

  let mainTotal = 0
  for(let x=0;x<oldData.createPurchaseOrderYarn[0].tableData.length;x++){
    const tableValue = oldData.createPurchaseOrderYarn[0].tableData[x]?.[1]
    mainTotal = mainTotal + +tableValue
  }


  if(mainTotal === total){
    console.log("delete")
    const updateData = await User.findOneAndUpdate({name,"createPurchaseOrderYarn.poNumber":po},{$set:{"createPurchaseOrderYarn.$.orderCompleted":"yes"}})
    const deleteData = await User.findOneAndUpdate({name,"yarnUpdated.poNumber": po},{$pull:{yarnUpdated:{poNumber:po}}})
  }
  })


   //=================== spare ================

app.post("/spare",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const data = user.createPurchaseOrderSpare
  let spare = []
  for(let x = 0;x<data.length;x++){
    spare.push(data[x].partyName)
  } 

  let uniqueSpare = spare.filter((c, index) => {
    return spare.indexOf(c) === index;
});

  res.render("sparePo.ejs",{name,popup:false,uniqueSpare})
})

app.post("/spare/po",async(req,res)=>{
  const {name, partyName} = req.body
  const user = await User.findOne({name})
  const spare = user.createPurchaseOrderSpare
  let spare1 = []
  for(let x = 0;x<spare.length;x++){
    spare1.push(spare[x].partyName)
  } 

  let uniqueSpare = spare1.filter((c, index) => {
    return spare1.indexOf(c) === index;
});

  // const user1 = await User.findOne({name},{createPurchaseOrder:{$elemMatch:{partyName,orderCompleted:"no"}}})
  const data = user.createPurchaseOrderSpare
  const po = []
  for(let x=0;x<data.length;x++){
    if(data[x].partyName === partyName && data[x].orderCompleted === "no"){
      po.push(data[x].poNumber)
    }
  }
  console.log(partyName,po)
  res.render("spare.ejs",{name,partyName,po,popup:false,uniqueSpare})
})

app.post("/spare/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const spare = user.spareUpdated
  const data = user.spareUpdated
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
      console.log(poNumber,data[x].poNumber)
    }
  }
  const main = await User.findOne({name},{createPurchaseOrderSpare:{$elemMatch:{poNumber}}})
  const t1 = main.createPurchaseOrderSpare[0].tableData
  const remain = []
  
  
  let {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  console.log("otherCharges",otherCharges)
  
  for(let x=0;x<t1.length;x++){
    if(t1[x]?.[1] - +tableData[x]?.[1] == 0){
      remain.push(t1[x]?.[1])
    }else{remain.push(t1[x]?.[1] - +tableData[x]?.[1])}
  }
  res.render("subSpare.ejs",{remain,spare,discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges})
 })

 app.post("/spare/create1", async(req,res)=>{
  console.log("right")
  const {name} = req.body
  const data = req.body
  delete data.name
 const po = data.poNumber
  const user = await User.findOneAndUpdate({name},{ $push: {spare:data} },{ new: true })
  const user1 = await User.findOneAndUpdate({name,"spareUpdated.poNumber": po},{$set:{"spareUpdated.$":data}})
  const oldData = await User.findOne({name},{createPurchaseOrderSpare:{$elemMatch:{poNumber:po}}})
 
  const spare = await User.findOne({name}) 
  const a = spare.spare
  let total = 0
  for(let x=0;x<a.length;x++){
    if(a[x].poNumber===po){
      for(let y=0;y<a[x].tableData.length;y++){
        const tableValue = a[x].tableData[y]?.[1]
        total = total + +tableValue
      }
    }
  }

  let mainTotal = 0
  for(let x=0;x<oldData.createPurchaseOrderSpare[0].tableData.length;x++){
    const tableValue = oldData.createPurchaseOrderSpare[0].tableData[x]?.[1]
    mainTotal = mainTotal + +tableValue
  }


  if(mainTotal === total){
    const updateData = await User.findOneAndUpdate({name,"createPurchaseOrderSpare.poNumber":po},{$set:{"createPurchaseOrderSpare.$.orderCompleted":"yes"}})
    const deleteData = await User.findOneAndUpdate({name,"spareUpdated.poNumber": po},{$pull:{spareUpdated:{poNumber:po}}})
  }
 })


   //=================== Sales Fabric Information ================

app.post("/createSalesOrderFabric",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const hsn = user.createHsnCode
  const account = user.createAccount
  let no = 0
  if(user.createSalesOrderFabric){
     no = +user.createSalesOrderFabric.length + 1
    }
  res.render("salesOrderFabric.ejs",{name,popup:false,hsn,account,no})
})

app.post("/createSalesOrderFabric/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
 
  const user = await User.findOneAndUpdate({name},{ $push: {createSalesOrderFabric:data} },{ new: true })
  data.grandTotal = 0
  const userUpdated = await User.findOneAndUpdate({name},{ $push: {fabricSalesUpdated:data} },{ new: true })
 })


 //=================== Sales Gray Information ================

app.post("/createSalesOrderGray",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const hsn = user.createHsnCode
  const account = user.createAccount
  let no = 0
  if(user.createSalesOrderGray){
     no = +user.createSalesOrderGray.length + 1
    }
  res.render("SalesOrderGray.ejs",{name,popup:false,hsn,account,no})
})

app.post("/createSalesOrderGray/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log(data)
 
  const user = await User.findOneAndUpdate({name},{ $push: {createSalesOrderGray:data} },{ new: true })
  data.grandTotal = 0
  const userUpdated = await User.findOneAndUpdate({name},{ $push: {graySalesUpdated:data} },{ new: true })
 })


 //=================== Sales Yarn Information ================

app.post("/createSalesOrderYarn",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const yarn = user.createYarn
  const hsn = user.createHsnCode
  const account = user.createAccount
  let no = 0
  const mill = user.createYarnMillName
  if(user.createSalesOrderYarn){
     no = +user.createSalesOrderYarn.length + 1
    }
  res.render("SalesOrderYarn.ejs",{name,popup:false,hsn,yarn,account,no,mill})
})

app.post("/createSalesOrderYarn/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
 
  const user = await User.findOneAndUpdate({name},{ $push: {createSalesOrderYarn:data} },{ new: true })
  data.grandTotal = 0
  const userUpdated = await User.findOneAndUpdate({name},{ $push: {yarnSalesUpdated:data} },{ new: true })
 })


  //=================== Fabric Sales ================

app.post("/fabricSales",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const data = user.createSalesOrderFabric
  let fabric = []
  for(let x = 0;x<data.length;x++){
    fabric.push(data[x].partyName)
  } 

  let uniqueFabric = fabric.filter((c, index) => {
    return fabric.indexOf(c) === index;
});

  res.render("fabricSalesPo.ejs",{name,popup:false,uniqueFabric})
})

app.post("/fabricSales/po",async(req,res)=>{
  const {name, partyName} = req.body
  const user = await User.findOne({name})
  const fabric = user.createSalesOrderFabric
  let fabric1 = []
  for(let x = 0;x<fabric.length;x++){
    fabric1.push(fabric[x].partyName)
  } 

  let uniqueFabric = fabric1.filter((c, index) => {
    return fabric1.indexOf(c) === index;
});

  // const user1 = await User.findOne({name},{createSalesOrderFabric:{$elemMatch:{partyName,orderCompleted:"no"}}})
  const data = user.createSalesOrderFabric
  const po = []
  for(let x=0;x<data.length;x++){
    if(data[x].partyName === partyName && data[x].orderCompleted === "no"){
      po.push(data[x].poNumber)
    }
  }
  console.log(partyName,po)
  res.render("fabricSales.ejs",{name,partyName,po,popup:false,uniqueFabric})
})

app.post("/fabricSales/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const fabric = user.fabricSalesUpdated
  const data = user.fabricSalesUpdated
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
    }
  }
  const main = await User.findOne({name},{createSalesOrderFabric:{$elemMatch:{poNumber}}})
  const t1 = main.createSalesOrderFabric[0].tableData
  const remain = []
  
  
  let {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
 
  
  for(let x=0;x<t1.length;x++){
    if(t1[x]?.[1] - +tableData[x]?.[1] == 0){
      remain.push(t1[x]?.[1])
    }else{remain.push(t1[x]?.[1] - +tableData[x]?.[1])}
  }
  res.render("subFabricSales.ejs",{remain,fabric,discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges})
 })

 app.post("/fabricSales/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
 const po = data.poNumber
  const user = await User.findOneAndUpdate({name},{ $push: {fabricSales:data} },{ new: true })
  const user1 = await User.findOneAndUpdate({name,"fabricSalesUpdated.poNumber": po},{$set:{"fabricSalesUpdated.$":data}})
  const oldData = await User.findOne({name},{createSalesOrderFabric:{$elemMatch:{poNumber:po}}})
  const fabric = await User.findOne({name}) 
  const a = fabric.fabricSales
  let total = 0
  for(let x=0;x<a.length;x++){
    if(a[x].poNumber===po){
      for(let y=0;y<a[x].tableData.length;y++){
        const tableValue = a[x].tableData[y]?.[1]
        total = total + +tableValue
      }
    }
  }

  let mainTotal = 0
  for(let x=0;x<oldData.createSalesOrderFabric[0].tableData.length;x++){
    const tableValue = oldData.createSalesOrderFabric[0].tableData[x]?.[1]
    mainTotal = mainTotal + +tableValue
  }

console.log(mainTotal,total)
  if(mainTotal === total){
    console.log("delete")
    const updateData = await User.findOneAndUpdate({name,"createSalesOrderFabric.poNumber":po},{$set:{"createSalesOrderFabric.$.orderCompleted":"yes"}})
    const deleteData = await User.findOneAndUpdate({name,"fabricSalesUpdated.poNumber": po},{$pull:{fabricSalesUpdated:{poNumber:po}}})
  }
 })


  //=================== Gray Sales ================

  app.post("/graySales",async(req,res)=>{
    const name = req.body.name
    console.log(name)
    const user = await User.findOne({name})
    const data = user.createSalesOrderGray
    let gray = []
    for(let x = 0;x<data.length;x++){
      gray.push(data[x].partyName)
    } 
  
    let uniqueGray = gray.filter((c, index) => {
      return gray.indexOf(c) === index;
  });
  
    res.render("graySalesPo.ejs",{name,popup:false,uniqueGray})
  })
  
  app.post("/graySales/po",async(req,res)=>{
    const {name, partyName} = req.body
    const user = await User.findOne({name})
    const gray = user.createSalesOrderGray
    let gray1 = []
    for(let x = 0;x<gray.length;x++){
      gray1.push(gray[x].partyName)
    } 
  
    let uniqueGray = gray1.filter((c, index) => {
      return gray1.indexOf(c) === index;
  });
  
    // const user1 = await User.findOne({name},{createSalesOrderGray:{$elemMatch:{partyName,orderCompleted:"no"}}})
    const data = user.createSalesOrderGray
    const po = []
    for(let x=0;x<data.length;x++){
      if(data[x].partyName === partyName && data[x].orderCompleted === "no"){
        po.push(data[x].poNumber)
      }
    }
    console.log(partyName,po)
    res.render("graySales.ejs",{name,partyName,po,popup:false,uniqueGray})
  })
  
  app.post("/graySales/create", async(req,res)=>{
    const {name,poNumber} = req.body
    const user = await User.findOne({name})
    const gray = user.graySalesUpdated
    const data = user.graySalesUpdated
    let y = 0
    for(let x=0; x<data.length;x++){
      if(poNumber===data[x].poNumber){
        y = x
      }
    }
    const main = await User.findOne({name},{createSalesOrderGray:{$elemMatch:{poNumber}}})
    const t1 = main.createSalesOrderGray[0].tableData
    const remain = []
    
    
    let {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
   
    
    for(let x=0;x<t1.length;x++){
      if(t1[x]?.[1] - +tableData[x]?.[1] == 0){
        remain.push(t1[x]?.[1])
      }else{remain.push(t1[x]?.[1] - +tableData[x]?.[1])}
    }
    res.render("subGraySales.ejs",{remain,gray,discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges})
   })
  
   app.post("/graySales/create1", async(req,res)=>{
    const {name} = req.body
    const data = req.body
    delete data.name
   const po = data.poNumber
    const user = await User.findOneAndUpdate({name},{ $push: {graySales:data} },{ new: true })
    const user1 = await User.findOneAndUpdate({name,"graySalesUpdated.poNumber": po},{$set:{"graySalesUpdated.$":data}})
    const oldData = await User.findOne({name},{createSalesOrderGray:{$elemMatch:{poNumber:po}}})
    const gray = await User.findOne({name}) 
    const a = gray.graySales
    let total = 0
    for(let x=0;x<a.length;x++){
      if(a[x].poNumber===po){
        for(let y=0;y<a[x].tableData.length;y++){
          const tableValue = a[x].tableData[y]?.[1]
          total = total + +tableValue
        }
      }
    }
  
    let mainTotal = 0
    for(let x=0;x<oldData.createSalesOrderGray[0].tableData.length;x++){
      const tableValue = oldData.createSalesOrderGray[0].tableData[x]?.[1]
      mainTotal = mainTotal + +tableValue
    }
  
  console.log(mainTotal,total)
    if(mainTotal === total){
      console.log("delete")
      const updateData = await User.findOneAndUpdate({name,"createSalesOrderGray.poNumber":po},{$set:{"createSalesOrderGray.$.orderCompleted":"yes"}})
      const deleteData = await User.findOneAndUpdate({name,"graySalesUpdated.poNumber": po},{$pull:{graySalesUpdated:{poNumber:po}}})
    }
   })


     //=================== yarn Sales ================

app.post("/yarnSales",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const data = user.createSalesOrderYarn
  let yarn = []
  for(let x = 0;x<data.length;x++){
    yarn.push(data[x].partyName)
  }
  let uniqueYarn = yarn.filter((c, index) => {
    return yarn.indexOf(c) === index;
});
  res.render("yarnSalesPo.ejs",{name,popup:false,yarn,uniqueYarn})
})

app.post("/yarnSales/po",async(req,res)=>{
  const {name, partyName} = req.body
  const user = await User.findOne({name})
  const yarn = user.createSalesOrderYarn
  let yarn1 = []
  for(let x = 0;x<yarn.length;x++){
    yarn1.push(yarn[x].partyName)
  } 

  let uniqueYarn = yarn1.filter((c, index) => {
    return yarn1.indexOf(c) === index;
});

  // const user1 = await User.findOne({name},{createSalesOrderYarn:{$elemMatch:{partyName,orderCompleted:"no"}}})
  const data = user.createSalesOrderYarn
  const po = []
  for(let x=0;x<data.length;x++){
    if(data[x].partyName === partyName && data[x].orderCompleted === "no"){
      po.push(data[x].poNumber)
    }
  }
  console.log(partyName,po)
  res.render("yarnSales.ejs",{name,partyName,po,popup:false,uniqueYarn})
})

app.post("/yarnSales/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const yarn = user.yarnSalesUpdated
  const data = user.yarnSalesUpdated
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
      console.log(poNumber,data[x].poNumber)
    }
  }
  const main = await User.findOne({name},{createSalesOrderYarn:{$elemMatch:{poNumber}}})
  const t1 = main.createSalesOrderYarn[0].tableData
  const remain = []
  
  
  let {tableData,otherCharges,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  
  for(let x=0;x<t1.length;x++){
    if(t1[x]?.[1] - +tableData[x]?.[1] == 0){
      remain.push(t1[x]?.[1])
    }else{remain.push(t1[x]?.[1] - +tableData[x]?.[1])}
  }
  res.render("subYarnSales.ejs",{remain,yarn,discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges})
 })

 app.post("/yarnSales/create1", async(req,res)=>{

  const {name} = req.body
  const data = req.body
  delete data.name
 const po = data.poNumber
  const user = await User.findOneAndUpdate({name},{ $push: {yarnSales:data} },{ new: true })
  const user1 = await User.findOneAndUpdate({name,"yarnSalesUpdated.poNumber": po},{$set:{"yarnSalesUpdated.$":data}})
  const oldData = await User.findOne({name},{createSalesOrderYarn:{$elemMatch:{poNumber:po}}})
  const yarn = await User.findOne({name}) 
  const a = yarn.yarnSales
  let total = 0
  for(let x=0;x<a.length;x++){
    if(a[x].poNumber===po){
      for(let y=0;y<a[x].tableData.length;y++){
        const tableValue = a[x].tableData[y]?.[1]
        total = total + +tableValue
      }
    }
  }

  let mainTotal = 0
  for(let x=0;x<oldData.createSalesOrderYarn[0].tableData.length;x++){
    const tableValue = oldData.createSalesOrderYarn[0].tableData[x]?.[1]
    mainTotal = mainTotal + +tableValue
  }


  if(mainTotal === total){
    console.log("delete")
    const updateData = await User.findOneAndUpdate({name,"createSalesOrderYarn.poNumber":po},{$set:{"createSalesOrderYarn.$.orderCompleted":"yes"}})
    const deleteData = await User.findOneAndUpdate({name,"yarnSalesUpdated.poNumber": po},{$pull:{yarnSalesUpdated:{poNumber:po}}})
  }
  })
  
 //================== Job Recieved with yarn =====================

 app.post("/createJobWithYarn",async(req,res)=>{
  const {name} = req.body
  const user = await User.findOne({name})
  const data = user.createJobWithYarn
  res.render("./job/JobWithYarn.ejs",{data,name})
 })

 app.post("/createJobWithYarn/create",async(req,res)=>{
  const {name} = req.body
  const user = await User.findOne({name})
  const mill = user.createYarnMillName
  const hsn = user.createHsnCode
  const yarn = user.createYarn
  const godown = user.createGodown
  res.render("./job/subJobWithYarn.ejs",{mill,hsn,yarn,godown,name,popup:false})
 })
  
 app.post("/createJobWithYarn/create1",async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  const user1 = await User.findOneAndUpdate({name},{ $push: {createJobWithYarn:data} },{ new: true })
  const user = await User.findOne({name})
  const mill = user.createYarnMillName
  const hsn = user.createHsnCode
  const yarn = user.createYarn
  const godown = user.createGodown
  res.render("./job/subJobWithYarn.ejs",{mill,hsn,yarn,godown,name,popup:true})
})


//================== Job Recieved with yarn & Beam =====================

app.post("/createJobWithYarn&Beam/create",async(req,res)=>{
  const {name} = req.body
  const user = await User.findOne({name})
  const flange = user.createFlange
  res.render("./job/subJobWithYarn&Beam.ejs",{flange,name,popup:false})
 })

 app.post("/createJobWithYarn&Beam/create1",async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  const user1 = await User.findOneAndUpdate({name},{ $push: {createJobWithYarnBeam:data} },{ new: true })
  const user = await User.findOne({name})
  const flange = user.createFlange
  res.render("./job/subJobWithYarn&Beam.ejs",{flange,name,popup:true})
 }) 

 //================== Job SO =====================

 app.post("/jobSo",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const account = user.createAccount
  let no = 0
  if(user.createPurchaseOrder){
     no = +user.createPurchaseOrder.length + 1
    }
  res.render("./job/jobSo.ejs",{name,popup:false,account,no})
})
 //================== Sizing PO =====================

 app.post("/sizingPo",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const hsn = user.createHsnCode
  const account = user.createAccount
  let no = 0
  if(user.SizingPo){
     no = +user.SizingPo.length + 1
    }
  res.render("sizingPo.ejs",{name,popup:false,hsn,no,account})
})

app.post("/sizingPo/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
  console.log("hello",data)
  const user = await User.findOneAndUpdate({name},{ $push: {SizingPo:data} },{ new: true })
  data.grandTotal = 0
  const userUpdated = await User.findOneAndUpdate({name},{ $push: {SizingPoUpdate:data} },{ new: true })
 })


  
 //================== Sizing Purchase =====================

 app.post("/sizing",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const data = user.SizingPo
  let sizing = []
  for(let x = 0;x<data.length;x++){
    sizing.push(data[x].partyName)
  } 

  let uniqueSizing = sizing.filter((c, index) => {
    return sizing.indexOf(c) === index;
});

  res.render("sizingPurchase.ejs",{name,popup:false,uniqueSizing})
})

app.post("/sizing/po",async(req,res)=>{
  const {name, partyName} = req.body
  const user = await User.findOne({name})
  const sizing = user.SizingPo
  let sizing1 = []
  for(let x = 0;x<sizing.length;x++){
    sizing1.push(sizing[x].partyName)
  } 

  let uniqueSizing = sizing1.filter((c, index) => {
    return sizing1.indexOf(c) === index;
});

  // const user1 = await User.findOne({name},{createPurchaseOrder:{$elemMatch:{partyName,orderCompleted:"no"}}})
  const data = user.SizingPo
  const po = []
  for(let x=0;x<data.length;x++){
    if(data[x].partyName === partyName && data[x].orderCompleted === "no"){
      po.push(data[x].poNumber)
    }
  }
  console.log(partyName,po)
  res.render("sizing.ejs",{name,partyName,po,popup:false,uniqueSizing})
})

app.post("/sizing/create", async(req,res)=>{
  const {name,poNumber} = req.body
  const user = await User.findOne({name})
  const sizing = user.SizingPoUpdate
  const data = user.SizingPoUpdate
  let y = 0
  for(let x=0; x<data.length;x++){
    if(poNumber===data[x].poNumber){
      y = x
      console.log(poNumber,data[x].poNumber)
    }
  }
  const main = await User.findOne({name},{SizingPo:{$elemMatch:{poNumber}}})
  const t1 = main.SizingPo[0].tableData
  const remain = []
  
  
  let {tableData,otherCharges,qualityNo,warpYarn,remark,grandTotal,date,partyName,cgst,igst,sgst,discount,frieghtCharges} = data[y]
  console.log("otherCharges",otherCharges)
  
  for(let x=0;x<t1.length;x++){
    if(t1[x]?.[6] - +tableData[x]?.[6] == 0){
      remain.push(t1[x]?.[6])
    }else{remain.push(t1[x]?.[6] - +tableData[x]?.[6])}
  }
  res.render("subSizing.ejs",{qualityNo,warpYarn,remain,sizing,discount,cgst,sgst,igst,name,tableData,otherCharges,remark,grandTotal,date,partyName,poNumber,frieghtCharges})
 })

 app.post("/sizing/create1", async(req,res)=>{
  const {name} = req.body
  const data = req.body
  delete data.name
 const po = data.poNumber
  const user = await User.findOneAndUpdate({name},{ $push: {sizing:data} },{ new: true })
  const user1 = await User.findOneAndUpdate({name,"SizingPoUpdate.poNumber": po},{$set:{"SizingPoUpdate.$":data}})
  const oldData = await User.findOne({name},{SizingPo:{$elemMatch:{poNumber:po}}})
  const sizing = await User.findOne({name}) 
  const a = sizing.sizing
  let total = 0
  for(let x=0;x<a.length;x++){
    if(a[x].poNumber===po){
      for(let y=0;y<a[x].tableData.length;y++){
        const tableValue = a[x].tableData[y]?.[6]
        total = total + +tableValue
      }
    }
  }

  let mainTotal = 0
  for(let x=0;x<oldData.SizingPo[0].tableData.length;x++){
    const tableValue = oldData.SizingPo[0].tableData[x]?.[6]
    mainTotal = mainTotal + +tableValue
  }


  if(mainTotal === total){
    console.log("delete")
    const updateData = await User.findOneAndUpdate({name,"SizingPo.poNumber":po},{$set:{"SizingPo.$.orderCompleted":"yes"}})
    const deleteData = await User.findOneAndUpdate({name,"SizingPoUpdate.poNumber": po},{$pull:{SizingPoUpdate:{poNumber:po}}})
  }
 })

 //================== Process Challan =====================
 app.post("/processChallan",async(req,res)=>{
  const name = req.body.name
  console.log(name)
  const user = await User.findOne({name})
  const account = user.createAccount
  let no = 0
  if(user.createPurchaseOrder){
     no = +user.createPurchaseOrder.length + 1
    }
  res.render("./process/processChallan.ejs",{name,popup:false,account,no})
})

 //================== server =====================


app.listen(3000,()=>{
    console.log("server started")
})