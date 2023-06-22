import { Bard } from "googlebard";

let bot = new Bard(`__Secure-1PSID=Xwi93Z1gFl6LkgSqLbyQBcEupJaHCb7kSIpTve6YCT9LVnfZrRCRMSjrHSI71DbxO0yydw.`);
console.log(bot)
const bard = async()=>{
    let response = await bot.ask("Hello?");
    console.log(response);}
bard()