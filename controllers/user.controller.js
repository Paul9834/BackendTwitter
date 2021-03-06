const dbManager = require ('../database.config/database.manager');
const { Op } = require("sequelize");

/**
 * Creation of an user
 * @param {*} userObject JSON Object with User information
 */

async function createUser (req, res) {
    
    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
          message: "Request body is empty!!!!"
        });
        return;
    }
    
    // CREATING THE OBJECT TO PERSIST
    const newUserObject = {
        username: req.body.username,
        creation_date: req.body.creation_date
    }

    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.User.create(newUserObject).then (
        data => {
            res.send (data);
        }

    ).catch (
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "Some error occurred"
            });
        }
    );
}

/**
 * GEt all users
 */
async function findAllUsers (req, res){
    try {
        //Execute query
        const users = await dbManager.User.findAll ();
        
        //Send response
        res.json({
                data: users
        });

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

/**
 * Get user by id
 */
async function findOneUser (req, res){
    try {
        const { idUser } = req.params;

        //Execute query
        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });
        //Send response
        res.json(user);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}
/**
 * Update user
 */
async function updateUser (req, res){
    /**
     * TASK:
     * IMPLEMENT THE FUNCTION________-
     */
    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    if (!req.params) {
        res.status(400).send({
            message: "Request params is empty!!!!"
        });
        return;
    }

    const userUpdate = {
        username: req.body.username
    }

    const user_id = req.params.idUser

    dbManager.User.update(userUpdate, { where: {idUser: user_id}}).then (
        data => {
            res.send(data);
        }
    ).catch (
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "No se pudo actualizar el usuario"
            });
        }
    );



}

/**
 * Delete an existen user by username
 * @param {*} req
 * @param {*} res
 */
function deleteUserByUsername (req, res){
    /**
     * TASK:
     * IMPLEMENT THE FUNCTION________-
     */

    if (!req.params) {
        res.status(400).send({
            message: "Request params is empty!!!!"
        });
        return;
    }

    const username_params = req.params.username

    dbManager.User.destroy({where: {username: username_params}}).then(
        res.send("El usuario se elimino correctamente")
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "No se pudo eliminar el usuario."
            });
        }
    );
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
function deleteAllUsers(req, res) {
    /**
     * TASK:
     * IMPLEMENT THE FUNCTION______________________-
     */

    //[Op.gt] : 0}

    dbManager.User.destroy({where: {idUser: {[Op.gt]: 0}}}).then(
        res.send("Se elimino todos los usuarios correctamente")
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "No se pudo eliminar todos los usuarios."
            });
        }
    );

}

/**
 *
 * @param {*} req
 * @param {*} res
 */
function findAllUsersByCreatedDate(req, res) {

    /**
     * TASK:
     * IMPLEMENT THE FUNCTION______________________-
     */

    const fecha = req.params.creation_date

    dbManager.User.findAll( { where: {

            creation_date: { [Op.between]: [fecha, fecha]}} }).then(

        data => {
            res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "No se pudo eliminar todos los usuarios."
            });
        }
    );
}


exports.createUser = createUser; 
exports.findAllUsers = findAllUsers; 
exports.findOneUser = findOneUser; 
exports.updateUser = updateUser;
exports.deleteUserByUsername = deleteUserByUsername;
exports.deleteAllUsers = deleteAllUsers;
exports.findAllUsersByCreatedDate = findAllUsersByCreatedDate;