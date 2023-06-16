var request = require('request');
var S10 = require('s10');
var fs = require('fs');

var number = "UH047102209US"
var idNacional = "II024335065UY"
function caller(args) {
    if (!S10.trackingNumberIsValid(args)) {
        console.log("Invalid number")
    } else {
        var options = {
            'method': 'GET',
            'url': 'https://ahiva.correo.com.uy/servicioConsultaTntIps-wsWeb/seguimientoEnvios/eventosweb?codigoPieza=' + args,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            resp = JSON.parse(response.body)
            console.log(resp)
            fs.writeFileSync("output.json", JSON.stringify(resp[0]), { flag: 'a+' })
        });
    }

}

function generator(trackingNumber) {
    let trackingArray = []
    prefix = "II"
    suffix = "UY"
    if (trackingNumber[2] === "0") {
        //console.log(trackingNumber[2] + " hay un cero en mi sopa")
        let cursor = parseInt(trackingNumber.match(/(\d+)/)) //will need to add a 0 at the mouth
        //cursor = cursor - 2500 //sacale 1000 mas a ver
        //cuenta 1000 numeros hacia atras y guarda los validos
        for (let index = 1; index < 10000; index++) {
            cursor = cursor - 1
            let arg = prefix + "0" + cursor.toString() + suffix
            if (S10.trackingNumberIsValid(arg)) {
                console.log(arg)
                trackingArray.push(arg)
            }
        }
        warDialer(trackingArray)
    }
}

function warDialer(trackingArray) {
    trackingArray.forEach(element => {
        caller(element)
    });
}

generator(idNacional)