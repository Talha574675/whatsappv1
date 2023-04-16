const midjourney = (...args) => import('midjourney-client').then(({default: fetch}) => fetch(...args));
const sendfromlink = require('./sendfromlink.js')
module.exports =  img= async (text ,client, id)=>{
  console.log('running midjourney')
midjourney(text, { width: 1024 }).then(async(imglink)=>{
    console.log('img links', imglink)
  
      
    const buttonMessage = {
        image: {url: imglink[0]},
        caption: text,
        
        footer: 'Midjourney',
         headerType: 4
    }
    
     await client.sendMessage(id, buttonMessage)
     console.log('done')
   
})

}

// bot.command("Imgm", async (ctx) => {
//   const text = ctx.message.text?.replace("/image", "")?.trim().toLowerCase();

//   if (text) {
   
//     midjourney( text ).then((res)=>{

//     if (res) {
//       ctx.sendChatAction("upload_photo");
//       // ctx.sendPhoto(res);
//       // ctx.telegram.sendPhoto()
//       ctx.telegram.sendPhoto(ctx.message.chat.id, res, {
//         reply_to_message_id: ctx.message.message_id,
//       });
//     }})
//   } else {
    
//     ctx.telegram.sendMessage(
//       ctx.message.chat.id,
//       "You have to give some description after /image",
//       {
//         reply_to_message_id: ctx.message.message_id,
//       }
//     );
//   }
// });
