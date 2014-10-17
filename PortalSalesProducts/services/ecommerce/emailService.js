var nodemailer = require('nodemailer');

var emailService= {};

emailService.sendConfirmation = function(params, product, next) {
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vandalosk8@gmail.com',
            pass: 'vandalos'
        }
    });
    
    var mailOptions = {
        from: 'Vandalos Skateboard', // sender address
        to: params.email,
        bcc: "vandalosk8@gmail.com",
        subject: 'Confirmación de pedido ',
        text: '' ,

        html: ''+
                "<body>\n" +
                "    <div>\n" +
                "        <h1 style='text-align: center'>Vandalos Skateboard</h1>\n" +
                "        <h3 style='text-align: center'>Confirmación de pedido</h3>\n" +
                "        <div style='border: black 4px solid; padding: 30px; margin: auto; width: 600px'>\n" +
                "            <div>\n" +
                "                <h3>&nbsp;&nbsp; Información del producto</h3>\n" +
                "            </div>\n" +
                "\n" +
                "            <div style='border: #87ceeb 3px solid; width: 400px; margin: auto; padding: 20px;'>\n" +
                "                <h3>Producto: "+ product.name + "  </h3>\n" +
                "                <h3>Modelo: "+ product.model + "  </h3>\n" +
                "                <h3>Talla: "+ product.size + "   </h3>\n" +
                "                <h3>Color: " + product.color + "  </h3>\n" +
                "                <h3>Cantidad: " + params.quantity + "</h3>\n" +
                "                <br />\n" +
                "                <h2 style='text-align: right'>  Total: $&nbsp;&nbsp; " + product.price*params.quantity + " </h2>\n" +
                "                <br />\n" +
                "                <p>" + product.description + "</p>\n" +
                "\n" +
                "            </div>\n" +
                "            <br />\n" +
                "            <div>\n" +
                "                <h3>&nbsp;&nbsp; Formas de pago</h3>\n" +
                "            </div>\n" +
                "            <div style='border: #87ceeb 3px solid; width: 400px; margin: auto; padding: 20px;'>\n" +
                "\n" +
                "                <h3 style='text-align: center; font-style: oblique'>Transferencia Bancaria</h3>\n" +
                "                <h3>Banco:   </h3>\n" +
                "                <h3>Número de cuenta:   </h3>\n" +
                "                <h3>Nombre del beneficiario:   </h3>\n" +
                "                <br />\n" +
                "                <h3 style='text-align: center; font-style: oblique'>Otro método</h3>\n" +
                "                <h3>Datos:   </h3>\n" +
                "                <h3>Número de cuenta:   </h3>\n" +
                "                <h3>Nombre del beneficiario:   </h3>\n" +
                "                <br />\n" +
                "\n" +
                "            </div>\n" +
                "            <p>Dudas o aclaraciones</p>\n" +
                "            <p><i style='font-style: oblique'>Correo electrónico: </i>vandalosk8@gmail.com, <i style='font-style: oblique'>Telefono:</i> (015) 5077 3688 ​</p>\n" +
                "\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>"
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            next(error);
        } else {
            console.log('Message sent: ' + info.response);
            next();
        }
    });
}

module.exports = emailService;