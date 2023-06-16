var request = require('request');
var S10 = require('s10');
var fs = require('fs');
const suffix = "US";
const prefix = "UH"
const cantidad = []
function reader() {
    let americanos = []
    file = fs.readFileSync('laia.json');
    shipments = JSON.parse(file)
    shipments.forEach(element => {
        cantidad.push(element)
        if (typeof element.idInternacional !== 'undefined' && element.idInternacional) {
            //do stuff if query is defined and not null
            if (element.idInternacional.slice(-2) === suffix && element.idInternacional.slice(0, 2) === prefix) {
                americanos.push(element)
            }


        }

    });
    fs.writeFileSync("laia.json", JSON.stringify(americanos), { flag: 'a+' })
    for (let index = 0; index < cantidad.length; index++) {
        const element = cantidad[index];
        console.log(index)
    }
}


reader()