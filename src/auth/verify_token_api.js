import jwt from 'jsonwebtoken';

const jwtVerifyApi = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        let decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.usuarioAuth = decoded;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Error en verificación de credenciales."})
    }
};


export default jwtVerifyApi