import jwt from 'jsonwebtoken';

const jwtVerifyView = (req, res, next) => {

    try {

        let { token } = req.query;

        let decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.usuarioAuth = decoded;

        next();
    } catch (error) {
        console.log(error);
        res.render("error", {
            message: "Ups! ha ocurrido un error al analizar las credenciales, vuelva a iniciar sesión."
        })
    }
};


export default jwtVerifyView