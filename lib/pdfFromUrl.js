const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function generatePdfFromUrl(url, pdfOptions) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to the specified URL
  await page.goto(url);

  // Create a simulated DOM environment with jsdom and use it to calculate the total height of the page
  const dom = new JSDOM(await page.content());
  const { height, scrollHeight } = dom.window.document.documentElement;

  // Set the height of the viewport to match the total height of the page
  await page.setViewport({ width: 800, height: scrollHeight });

  // Define the page ranges based on the total number of pages
  const totalPages = Math.ceil(scrollHeight / height);
//   const pageRanges = Array.from(Array(totalPages).keys()).map((i) => `${i + 1}`);

  // Create an array to store the PDF buffers for each page
  const pdfBuffers = [];

  // Generate the PDF for each page and store the buffer in the array
  for (let i = 0; i < totalPages; i++) {
    const buffer = await page.pdf({ ...pdfOptions, pageRanges: `${i + 1}` });
    pdfBuffers.push(buffer);
  }

  await browser.close();

  // Concatenate the PDF buffers for each page into a single buffer
  const combinedPdfBuffer = Buffer.concat(pdfBuffers);

  // Return the combined PDF buffer
  console.log(combinedPdfBuffer)
  return combinedPdfBuffer;
}

(async () => {
  // Replace "https://example.com" with the URL of the website you want to convert
  const url = 'https:www.google.com';

  // Define the PDF options (e.g., page size, margin, print background)
  const pdfOptions = {
    format: 'A4',
    margin: {
      top: '1cm',
      bottom: '1cm',
      left: '1cm',
      right: '1cm',
    },
    printBackground: true,
  };

  // Generate the PDF and log the buffer to the console
  const pdfBuffer = await generatePdfFromUrl(url, pdfOptions);
  console.log(pdfBuffer);
})();

