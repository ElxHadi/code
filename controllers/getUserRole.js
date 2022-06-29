const db  =require(`../routes/db.config`);


const getUserRole = async (req, res)=>{


    const userEmail = req.body.email;

    const getUserRoleQuery = `SELECT role FROM users WHERE email like '${userEmail}'`;

    db.query(getUserRoleQuery, function (error, results) {

    if(error) throw error
    else{

        res.send(results)
    }

    })



}


module.exports = getUserRole;