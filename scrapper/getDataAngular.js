import puppeteer from "puppeteer";
import { saveToJSON } from "../methods/saveToJSON.js";
import { saveToCSV } from "../methods/saveToCSV.js";
import { saveToExcel } from "../methods/saveToEXCEL.js";

export async function getDataAngular() {
    const navegador = await puppeteer.launch({ headless: false, slowMo: 500 });
    const pagina = await navegador.newPage();
    await pagina.goto('https://blog.angular.dev/');

    const data = await pagina.evaluate(() => {
        const arrayResult = [];
        const articles = document.querySelectorAll('article');

        articles.forEach(article => {
            const titulo = article.querySelector('h2')?.innerText;
            const texto = article.querySelector('h3')?.innerText;
            const avatar = article.querySelector('img')?.currentSrc;
            const nombre = article.querySelector('a > p')?.innerText;

            const dateLikesComments = article.querySelector('span > div > div')?.innerText?.split('\n') || [];
            const date = dateLikesComments[0] || null;
            const likes = dateLikesComments[1] || null;
            const comments = dateLikesComments[2] || null;

            arrayResult.push({
                titulo,
                texto,
                autor_avatar: avatar,
                autor_nombre: nombre,
                fecha: date,
                likes,
                comentarios: comments
            });
        });

        return arrayResult;
    });

    console.log(':::datos:::', JSON.stringify(data, null, 2));

    await navegador.close();

    saveToJSON(data, "angular");
    saveToCSV(data, "angular");
    saveToExcel(data, "angular");
}