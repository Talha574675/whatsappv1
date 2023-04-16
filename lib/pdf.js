const {jsPDF} = require('jspdf')
module.exports = pdf = async(client, id,text) =>{
const doc = new jsPDF();
text = text.split(' ')
for(let i = 0; i< text.length; i++){
    if(i%15 == 0 ){
        text[i] = `${text[i]}\n`
    }
}
doc.setFontSize(10);
// if(text.length> )

if(text.length > 0){
    doc.text(text.splice(0,400).join(' '), 10,10)
    
}

if(text.length > 400){
    doc.addPage();
    doc.text(text.splice(400,800).join(' '), 10,10)
    
}
if(text.length > 800){
    doc.addPage();
    doc.text(text.splice(800,1200).join(' '), 10,10)
   
}


console.log(text.length)

doc.save("./files/file.pdf"); // will save the file in the current working directory
client.sendMessage(id, {
    document:{url:"./files/file.pdf"}
    
})
}
