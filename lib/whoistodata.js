 const whois = require('whois-json');

module.exports = whoisData = async (client, id, text) => {
  try {
    const results = await whois(text, { follow: 3, verbose: true });
    const message = `Domain: ${results[0].data.domainName}\nRegistrar: ${results[0].data.registrar}\nCreation Date: ${results[0].data.creationDate}\nExpiration Date: ${results[0].data.registryExpiryDate}\nName Servers: ${results[0].data.nameServer}\n\nRegistrant Details:\nOrganization: ${results[1].data.registrantOrganization}\nState/Province: ${results[1].data.registrantStateProvince}\nCountry: ${results[1].data.registrantCountry}\nEmail: ${results[1].data.registrantEmail}\n\nAdmin Contact:\nOrganization: ${results[1].data.adminOrganization}\nState/Province: ${results[1].data.adminStateProvince}\nCountry: ${results[1].data.adminCountry}\nEmail: ${results[1].data.adminEmail}\n\nTech Contact:\nOrganization: ${results[1].data.techOrganization}\nState/Province: ${results[1].data.techStateProvince}\nCountry: ${results[1].data.techCountry}\nEmail: ${results[1].data.techEmail}`;
    client.sendMessage(id, { text: message });
  } catch (error) {
    console.log(error);
    client.sendMessage(id, { text: 'Sorry, there was an error getting the WHOIS information.' });
  }
};
