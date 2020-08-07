const puppeteer = require('puppeteer');
const fs = require('fs');

(async (gw) => {
  const gwUrl = `https://draftfantasyfootball.co.uk/league/started/kyw4GMkcbi626gKjP/team/2sseQeqM8g8DQtHJz/gameweek/${gw}`;
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto(gwUrl,  {waitUntil: 'networkidle2'});
  await page.waitForSelector('table');

  const table = await page.evaluate(() => {
    const table = [...document.querySelectorAll('table')].find((table) => {
      const tableHeaders = [...table.querySelectorAll('th')];
      if(tableHeaders.find(th => th.textContent === 'Manager')){
       return table;
      }
      return false
      })

      return [...table.rows].map(row => [...row.cells].map(cell => cell.textContent))
  });

  await browser.close();
  fs.writeFileSync(`${gw}.json`, JSON.stringify(table));
})(1);
