const google = require('googlethis');

const options = {
  page: 0, 
  safe: false, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed
  additional_params: { 
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: 'en' 
  }
}
module.exports= googlesearch = async  (client, id, text) => {

    console.log('running google',text)
    try {
        const response = await google.search(text, options);
        const data = ['_________________ \n']
        response.results.forEach((el)=>{
            
            data.push(`| *${el.title}* \n|  ${el.description} \n|  ${el.url}   |\n|\n|\n|   ________________\n`)
        })
       
        //   console.log(data.join(' '))
        
         console.log(response)
        if(response.translation.source_language){
            const sourceLand = response.translation.source_language
            const targerLang = response.translation.target_language
            const sourceText = response.translation.source_text
            const targetText = response.translation.target_text
            const datat = `\n
            _____________________\n
            
            \n${sourceLand} \n| ${sourceText} |\n
            \n
                 \n${targerLang}   \n | *${targetText}* |\n
             _______________
                 ` 
            await client.sendMessage(id, {text: datat})
        }
        else if(response.knowledge_panel.type){
            const meta = []
            response.knowledge_panel.metadata.forEach((el)=>{
              if(el.title != null || el.value != null){
              meta.push(`| ${el.title}   ${el.value} | \n`)
            }
            })
          //   if(response.knowledge_panel.images[0].url){
          //   await client.sendMessage(id, { image:{url:response.knowledge_panel.images[0].url}, caption: `\n||  ${response.knowledge_panel.type}  ||\n || *${response.knowledge_panel.title}*  || \n | ${response.knowledge_panel.description} \n | ${response.knowledge_panel.url} \n ${meta.join(' ')}`})  
          // } else{
            await client.sendMessage(id, { text:`\n||  ${response.knowledge_panel.type}  ||\n || *${response.knowledge_panel.title}*  || \n | ${response.knowledge_panel.description} \n | ${response.knowledge_panel.url} \n ${meta.join(' ')}`})  
          
          // }
        }else if(response.weather.location){
          
            await client.sendMessage(id, { text:`______________\n|Location:${response.weather.location}\n| ${response.weather.forecast}\n|Precitipation:${response.weather.precipitation}\n|Humidity:${response.weather.humidity}\n|Temperature:${response.weather.temperature}\n|Wind:${response.weather.wind}`})  
            
        }
        else {
             await client.sendMessage(id, {text:data.join(' ')})     
        }
        } catch (error) {
        console.log(error)
    }
}
// googlesearch('','','')