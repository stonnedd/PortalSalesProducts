var nodemailer = require('nodemailer');

var emailService= {};

emailService.sendConfirmation = function(params, product, next) {
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            //user: 'vandalosk8@gmail.com',
            //pass: 'vandalos'
            user: 'yonadab.lopez@gmail.com',
            pass: 'essecreta1'
        }
    });
    
    var mailOptions = {
        from: 'Vandalos Skateboard', // sender address
        to: params.email,
        bcc: "fyonadabls@hotmail.com",
        subject: 'Confirmación de pedido ',
        text: '' ,

        html: ''+
                "<body>\n" +
                "    <div>\n" +
                "        <h1 style='text-align: center'>Vandalos Skateboard</h1>\n" +
                "        <h3 style='text-align: center'>Confirmación de pedido</h3>\n" +
                "                 <h4 style='text-align: center'>" + params.fullname + "  </h4> \n" +
                "                 <p style='text-align: center'>" + params.email + "</p>\n" +
                "        <div style='border: black 4px solid; padding: 30px; margin: auto; width: 600px'>\n" +
                "            <div>\n" +
                "                <h3>&nbsp;&nbsp; Información del producto</h3>\n" +
                "            </div>\n" +
                "\n" +
                "            <div style='border: #87ceeb 3px solid; width: 400px; margin: auto; padding: 20px;'>\n" +
                "                <h4>Producto: "+ product.name + "  </h4>\n" +
                "                <h4>Modelo: "+ product.model + "  </h4>\n" +
                "                <h4>Talla: "+ product.size + "   </h4>\n" +
                "                <h4>Color: " + product.color + "  </h4>\n" +
                "                <h4>Cantidad: " + params.quantity + "</h4>\n" +
                "                <br />\n" +
                "                <h4 style='text-align: right'>  Subtotal: $&nbsp;&nbsp; " + product.price * params.quantity + " </h4>\n" +
                "                <h4 style='text-align: right'>  Envio: $&nbsp;&nbsp; " + params.cbfee + " </h4>\n" +
                "                <h3 style='text-align: right'>  Total: $&nbsp;&nbsp; <i style='font-weight:bolder'>" + (product.price * params.quantity + 1*params.cbfee) + "</i> </h3>\n" +
                "                <br />\n" +
                "\n" +
                "            </div>\n" +
                "            <br />\n" +
                "            <div>\n" +
                "                <h3>&nbsp;&nbsp; Formas de pago</h3>\n" +
                "            </div>\n" +
                "            <div style='border: #87ceeb 3px solid; width: 400px; margin: auto; padding: 20px;'>\n" +
                "\n" +
                "                <h3 style='text-align: center; font-style: oblique'>Transferencia Bancaria</h3>\n" +
                "                <h4>Banco: <i style='font-weight:bolder'>Banamex</i></h4>\n" +
                "                <h4>Sucursal: <i style='font-weight:bolder'>4685</i></h4>\n" +
                "                <h4>Número de cuenta: <i style='font-weight:bolder'>53863</i>   </h4>\n" +
                "                <h4>Número interbancario: <i style='font-weight:bolder'>0021 8046 8500 5386 39</i></h4>\n" +
                "                <h4>Nombre del beneficiario: <i style='font-weight:bolder'>Fabian Rojas Mondragón</i> </h4>\n" +
                "                <br />\n" +
            
                "                <h3 style='text-align: center; font-style: oblique'>Transferencia Bancaria</h3>\n" +
                "                <h4>Banco: <i style='font-weight:bolder'>Banco del Bajio</i> </h4>\n" +
                "                <h4>Número de cuenta: <i style='font-weight:bolder'>0078 1190 4020 1</i>  </h4>\n" +
                "                <h4>Número interbancario: <i style='font-weight:bolder'>0301 8078 1190 4020 15 </i>  </h4>\n" +
                "                <h4>Nombre del beneficiario: <i style='font-weight:bolder'>Fabian Rojas Mondragón </i></h4>\n" +
                "                <br />\n" +
                "                <h3 style='text-align: center; font-style: oblique'>Pago en Oxxos</h3>\n" +
                "                <h4>Tarjeta: <i style='font-weight:bolder'>Banamex</i>   </h4>\n" +
                "                <h4>Número de Tarjeta: <i style='font-weight:bolder'>4552 5502 3500 5996 </i></h4>\n" +
                "                <h3 style='text-align: center; font-style: oblique'>Pago Paypal</h3>\n" +
                "                <h4>Correo electrónico: <i style='font-weight:bolder'>vandalosk8@gmail.com  </i> </h4>\n" +
                "                <h5>aplica el 4% de comisión</h5>\n" +
                "                <h3 style='text-align: left; font-style: oblique'>Importante</h3>\n" +
                "                <h4 style='text-align:justify'>Una vez concretada la operación por favor responde a este correo con una imagen completa de " +
                "                   tu comprobante de pago junto con tus datos de envío y/o fídcales. Para que tu pedido sea enviado" +
                "                   el mismo día el comprobante debe ser enviado antes de la 1 pm.</h4>\n" +
                "\n" +
                "            </div>\n" +
                "            <br/>\n" +
                "            <p>Dudas o aclaraciones</p>\n" +
                "            <p><i style='font-style: oblique'>Correo electrónico: </i>vandalosk8@gmail.com <br/> <i style='font-style: oblique'>Teléfono:</i> (015) 5077 3688. <br/> <i style='font-style: oblique'>Móvil:</i> (044) 5540671356.</p> " +
                "            <p><i style='font-style: oblique'>Horario de atención: </p></i>\n" +
                "            <p>Lunes a viernes de 10:00 a 19:00 hrs<br/>"+      
                "            Sábados de 10:00 a 14:00 hrs​</p>" +      
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