var nodemailer = require('nodemailer');

var emailService= {};

emailService.sendConfirmation = function(params, product, next) {
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yonadab.lopez@gmail.com',
            pass: 'essecreta1'
        }
    });
    
    var mailOptions = {
        from: '<yonadab.lopez@gmail.com>', // sender address
        to: params.email,
        subject: 'Confirmación de pedido ',
        text: params.fullname + ':'
            + 'Tu pedido' + product.name + product.brand + product.model + 'esta en proceso.'   
        //html: '<b>Hello world ✔</b>' // html body
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