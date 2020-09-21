const dbManager = require ('../database.config/database.manager');
const { Op } = require("sequelize");


/**
 * Creation of a post
 * @param {*} postObject JSON Object with User information
 */

async function createPost(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }


    // CREATING THE OBJECT TO PERSIST
    const newPostObject = ({
        message: req.body.message,
        published_date: req.body.published_date,
        idUser : req.body.idUser
    })


    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE
    dbManager.Post.create(newPostObject).then (
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
async function findAllPost (req, res){
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
async function findOnePost(req, res){
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
async function updatePost (req, res) {
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

}

function deleteAllPosts(req, res) {
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
function findAllPostByCreatedDate(req, res) {

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



exports.createPost = createPost;
exports.findAllPost = findAllPost;
exports.findOnePost = findOnePost;
exports.updatePost =  updatePost;

exports.deleteAllPosts = deleteAllPosts;
exports.findAllPostByCreatedDate = findAllPostByCreatedDate;
