const vmap = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ'
const base = '34'
var vin = 'JTHKD5BH0D2170008'

const wmi = vmapencode(vin.substring(0,3))
const vds = vmapencode(vin.substring(2,5))
const ser = vmapencode(vin.substring(5,8))
//console.log("fcusegrifgvberwh\n"+wmi)


//console.log(vmap.length)

/*for(let i=0;i<vin.length;i++){
    console.log(vmapIndexOf(vin[i]))
}*/

//vmapencode("JTH",base)

//console.log('vin: '+vin)
//console.log("encoding section")

//var test = (vraddecx(wmi, 34, 3))
//console.log("\n\n\n",test)
var data = readFile()
var txty0 = data.split("\n")
var txty1 = []
for(var i = 0;i<txty0.length-1;i++){
    var j = strip(txty0[i])
    txty1.push(j)
}
    
console.log(txty1)
var textSQL=[]
//vin = txty1[0]
for(var i = 0;i<txty1.length-1;i++){
    var j = (txty0[i])
    //console.log(j)
    encodeDecode(j)
} 



function encodeDecode(vin1){
    //console.log('\n\n\n\n\nvin: '+vin)
    //console.log('encoding section')
    vraddecx(22900,34,3)
    wmiEn=vmapencode(vin1.substring(0,3),base)
    vdsEn=vmapencode(vin1.substring(3,8),base)
    serEn=vmapencode(vin1.substring(8),base)
    //console.log('deCoding section below ',wmiEn,vdsEn,serEn)
    textSQL.push(wmiEn.toString()+vdsEn.toString()+serEn.toString())
    var decode=''
    var swmi=vraddecx(wmiEn,base,wmiEn.toString().length)
    var svds=vraddecx(vdsEn,base,vdsEn.toString().length)
    var sser=vraddecx(serEn,base,serEn.toString().length)
    //console.log(swmi)
    //console.log(svds)
    //console.log(sser)
    decode=swmi.toString()+svds.toString()+sser.toString()

    //console.log('\n',":",wmiEn,vdsEn,serEn,vin1)
    console.log("INSERT INTO Vins (Vin,wmiVrad,desVrad,serVrad) VALUES (",vin1+",",wmiEn+",",vdsEn+",",serEn,");\n")

    if (vin === decode){
        //console.log(decode.toString() + " (the decode) \n"+ vin+" (the vin)\n\n\n\n\n\n\n\n ")
    }
    
}

function readFile(){
    var fs = require('fs');

    try {  
        var data = fs.readFileSync('vins100.txt', 'utf8');
        //console.log(data.toString()); 

        return data  
    } catch(e) {
        console.log('Error:', e.stack);
    }

}

var text = readFile()
//console.log(text)

var textList0 = text.split("\n")

var textList1=[]
textList0.forEach(strip)
for(var i = 0;i<textList0.length-1;i++){
    var j = strip(textList0[i])
    textList1.push(j)
}
//console.log(encodeList(textList0[0]))
//console.log(textList1)

var encodedVinList = []
for (var i=0;i<textList0.lengt-1; i++){
    var j = encodeList(textList0[i])
    encodedVinList.push(j)
}
//console.log(encodedVinList)


function encodeList(superData){
    var wmiEn0=vmapencode(superData.substring(0,3),base)
    var vdsEn0=vmapencode(superData.substring(3,8),base)
    var serEn0=vmapencode(superData.substring(8),base)

    var encode0 = wmiEn0.toString()+vdsEn0.toString()+serEn0.toString()
    return encode0
}
    

function strip(s){
    var i = s.indexOf("\r")
    return s.substring(0,i)
}

function vmapIndexOf(c){
    s=vmap.indexOf(c)
    
    return s
}

function vmapencode(data,base){
    var vrad=0
    var exp=0
    //for each letter in the data
    for(var i=0;i<data.length;i++){
         //mval is the index of the letter in the vmap
         var mval = vmapIndexOf(data[i])+1
         //exp shares what size of number so 126 is 3 number places
         var exp = (data.length-1)-i
         //vrad is a cummulative number of the indexOfLetter*base^exp
         vrad+=parseInt(mval)*Math.pow(base,exp)
         //console.log(data[i],mval,exp,vrad)
    }
    //console.log(vrad)
    return vrad
}

function vraddecx(vrad,base,length){
    //out is decoded carecters
    var out = ""
    //exp is the exontent that will change with every iteration
    var exp = 0
    for (var i = 0; i<length; i++){
        var vmapi= 0  //find letter in vmap
        var vdelta= 0 // remainder once highest power is subtracted out
        exp=(length-1)-i

        vradp = Math.pow(base,exp)
        var vmod = vrad%vradp
        

        //console.log(exp+" "+vradp+" "+vmod)

        if (vmod>0){
            //console.log(vdelta+" = "+vrad+" - "+vmod)
            vdelta=vrad-vmod     
            //console.log(vmapi+" = "+vdelta+" / "+vradp)
            vmapi = vdelta/vradp
            //console.log(vrad+" = "+vmod)
            vrad=vmod
        }
        else{
            vdelta=vrad
            vmapi=vrad
        }
        if(0<vmapi<34){
            //console.log(vmap.substring(vmapi-1,vmapi))
            out+=vmap.substring(vmapi-1,vmapi)
        }


    }
    return out
}

//https://stackoverflow.com/questions/9168737/read-a-text-file-using-node-js
