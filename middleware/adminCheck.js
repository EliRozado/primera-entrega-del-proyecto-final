// * middleware 
const isAdmin = true;

function adminCheck(req, res, next){
    if(isAdmin){
        next()
    }else(
        res.send({error: -1, mensaje: `método no autorizado para usuarios`})
    )
}

module.exports={adminCheck}