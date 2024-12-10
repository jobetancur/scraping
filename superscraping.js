import puppeteer from "puppeteer";
import fs from "fs";
import { cedulas_4001_4186 } from './colectoraDB2.js';

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  });

  try {

    const cc = cedulas_4001_4186

    const page = await browser.newPage();
    await page.goto("https://supergirosmovil.com.co/#/tabs//beneficiario-information-giros");
    
    await new Promise(resolve => setTimeout(resolve, 90000));
    
    console.log("ya esperé 2");

    const fullData = [];

    for(let i = 0; i < cc.length; i++){
          // Selector para el campo de entrada basado en las clases proporcionadas
          const inputSelector = '.text-input .text-input-md';
          
          // Espera a que el campo de entrada esté disponible y escribe el número
          await page.waitForSelector(inputSelector);

          // Borrar el contenido del campo de entrada
          await page.focus(inputSelector);
          for (let i = 0; i < 12; i++) {
              page.keyboard.press('Backspace');
          }

          await page.type(inputSelector, cc[i]); // Sustituye '3137249770' por el número que quieras escribir
          console.log("ya termine de escribir");

          // Selector para el botón con type=submit
          const submitButtonSelector = 'button[type="submit"]';
          await new Promise(resolve => setTimeout(resolve, 10000));
          console.log("1");

          // Espera a que el botón esté disponible y haz clic en él

          await page.waitForSelector(submitButtonSelector);
          console.log("1.5");
          await new Promise(resolve => setTimeout(resolve, 2000));

          await page.click(submitButtonSelector);
          console.log("2");

          await new Promise(resolve => setTimeout(resolve, 5000));

          console.log("3");
          
          const data = await page.evaluate(async () => {
            // Función auxiliar para esperar hasta que el atributo esté disponible o hasta que expire el tiempo de espera
            const waitForAttribute = async (element, attribute, timeout = 3000) => {
                return new Promise((resolve) => {
                    const startTime = Date.now();
        
                    const checkAttribute = () => {
                        const value = element.getAttribute(attribute);
                        if (value !== null && value !== undefined) {
                            resolve(value);
                        } else if (Date.now() - startTime >= timeout) {
                            resolve(null); // Devuelve null si se alcanza el tiempo de espera
                        } else {
                            setTimeout(checkAttribute, 100); // Reintentar después de 100ms
                        }
                    };
        
                    checkAttribute();
                });
            };
           
            const nombresInput = document.getElementsByName('txtnombres')[0];
            const apellidosInput = document.getElementsByName('apellidos')[0];
            const ccInput = document.getElementsByName('txtNumDocumento')[0];
            const celNumberInput = document.getElementsByName('celular')[0];
            const telNumberInput = document.getElementsByName('txtTelefono')[0];
            const emailInput = document.getElementsByName('txtEmail')[0];
        
            const nombres = nombresInput ? await waitForAttribute(nombresInput, 'ng-reflect-model') : null;
            const apellidos = apellidosInput ? await waitForAttribute(apellidosInput, 'ng-reflect-model') : null;
            const cc = ccInput ? await waitForAttribute(ccInput, 'ng-reflect-model') : null;
            const celNumber = celNumberInput ? await waitForAttribute(celNumberInput, 'ng-reflect-model') : null;
            const telNumber = telNumberInput ? await waitForAttribute(telNumberInput, 'ng-reflect-model') : null;
            const email = emailInput ? await waitForAttribute(emailInput, 'ng-reflect-model') : null;
        
            return {
              nombres,
              apellidos,
                cc,
                celNumber,
                telNumber,
                email
            };
        });
        
          console.log("data" , data);
          fullData.push(data);
          console.log("full data" , fullData);

          if (fullData) {
              fs.writeFileSync("cedulas_4001_4186.json", JSON.stringify(fullData, null, 2));
              console.log("Data written to file successfully");
          } else {
              console.error("Data is undefined or null");
          }
        }

    await browser.close();

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
}

openWebPage();