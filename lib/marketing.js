const sendMessage= async (text, array , client,id)=>{
   let i = 0; 
  const interval = setInterval(async ()=>{
     if(i < array.length){
        i++
        
        client.sendMessage(id,{text:`sending Message : *${Math.floor((i/array.length)*100)}*%`})
      
        try {
         
          await client.sendMessage(array[i],{text:text})
         } catch (error) {
         console.log(error)
       }
     }
     else{
        clearInterval(interval)
     }
   },10000)
}

const TextSender = async (client, text,id)=>{
try {
      let users = 100
      let array = []
      const interval = setInterval(async()=>{
      let num = Math.floor(Math.random()*10000000)
      const [result] = await client.onWhatsApp(`92334${num}@s.whatsapp.net`)
      console.log('...')
      if(result){
       array.push(result.jid)
       client.sendMessage(id, {text:`Loading: *${Math.floor((array.length/users)*100)}%* . . .`})
       console.log(array.length, 'array length')
       if(array.length >= users)
       {
       clearInterval(interval)
       await sendMessage(text, array , client,id)
       }
      }
      },500)
} catch (error) {
   console.log(error)
}
} 
 module.exports = TextSender