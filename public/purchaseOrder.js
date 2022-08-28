let basicAmt = document.getElementById("basicAmount");
let mtr = document.getElementById("mtr") ;
let rate = document.getElementById("rate");
let tax = document.getElementById("taxAmt");
let gst = document.getElementById("gst");
let totalAmt = document.getElementById("totalAmt")
let grandTotal = document.getElementById("grandTotal")
let cgst = document.getElementById("cgst")
let sgst = document.getElementById("sgst")
let igst = document.getElementById("igst")
let frieghtCharges = document.getElementById("frieghtCharges")
let discount = document.getElementById("discount")

const charges = []
let = chargesData = []
const po1 = [];
let data = []


const basicAmount = ()=>{ basicAmt.value = rate.value*mtr.value
}
const taxAmt =()=>{ 
    const x = basicAmt.value*(gst.value/100);
    tax.value = x.toFixed(2)
    const y = +basicAmt.value + +tax.value;
    totalAmt.value = y.toFixed(2)
} 

    
const addData =()=>{
    data = [
             document.getElementById("fabric").value,
             document.getElementById("mtr").value,
             document.getElementById("rate").value,
             document.getElementById("basicAmount").value,
             document.getElementById("hsnCode").value,
             document.getElementById("gst").value,
             document.getElementById("taxAmt").value,
             document.getElementById("totalAmt").value,
        ]
    po1.push(data)
    console.log(po1)
    createTable()
    }

const addData1 =()=>{
    chargesData = [
        document.getElementById("otherCharges").value,
        document.getElementById("amount").value,
     ]
     charges.push(chargesData)
     createTable1()
     console.log(po1)
}

    const createTable =()=>{

        const div = document.getElementById("tableData")
            const row = document.createElement("div");
            row.className += " row";
            div.append(row)

            for(let y=0; y<8; y++){
                const p = document.createElement("p");
                p.className += " col-sm";
                p.innerHTML = data[y];
                row.append(p)
                
            }
            document.getElementById("fabric").value = ""
             document.getElementById("mtr").value = ""
             document.getElementById("rate").value = ""
             document.getElementById("basicAmount").value = ""
             document.getElementById("hsnCode").value = ""
             document.getElementById("gst").value = ""
             document.getElementById("taxAmt").value = ""
             document.getElementById("totalAmt").value = ""


            const i = document.createElement("i");
                i.className += "col-sm bi bi-x-square"
                i.setAttribute("onclick","del(this.id)")
                i.setAttribute("id",`${po1.length}`)
                i.setAttribute("style","color:red")
                row.append(i)

             document.getElementById("fabric").focus()
             totalAmount()
    }

const createTable1 =()=>{
    const div = document.getElementById("tableData1")
            const row = document.createElement("div");
            row.className += "row";
            div.append(row)
    for(let y=0; y<2; y++){
        const p = document.createElement("p");
        p.className += "col-sm";
        p.innerHTML = chargesData[y];
        row.append(p)
    }

    document.getElementById("otherCharges").value=""
    document.getElementById("amount").value=""

    document.getElementById("otherCharges").focus()
    totalAmount()
}

const del =(id)=>{
const els = document.getElementById(id);
const parent = els.parentNode;
let index = $( "div" ).index( parent ) - 32
els.parentNode.remove();
po1.splice(index,1)
totalAmount()
}
    
const totalAmount =()=>{
 let maintotal = 0
 let otherTotal = 0
 let subTotal = 0
 for(let x=0;x<po1.length;x++){
       maintotal =  maintotal + parseInt(po1[x]?.[7])
 }
 for(let x=0;x<charges.length;x++){
       otherTotal =  otherTotal + parseInt(charges[x]?.[1])
 }
 subTotal = maintotal + otherTotal + +frieghtCharges.value - (maintotal*(discount.value/100))
 grandTotal.value = subTotal + (subTotal*(cgst.value/100)) + (subTotal*(sgst.value/100))+ (subTotal*(igst.value/100))
console.log(grandTotal.value)
}

function save(){
    jQuery.noConflict();
    jQuery.ajax({
            type: 'POST',
            url: 'http://localhost:3000/post',
            data: { name : "name", content : "content"},
            dataType: 'json'
        });
}
