const dbManager = require ('../database.config/database.manager');
const { Op } = require("sequelize");


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


async function updatePost(req, res) {

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

    const postUpdate = {
        message: req.body.message
    }

    const id_post = req.params.idPost

    dbManager.Post.update(postUpdate, { where: {idPost: id_post}}).then (
        data => {
            res.send(data);
        }
    ).catch (
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "No se pudo actualizar el post"
            });
        }
    );

}

async function deletePost(req, res) {

    if (!req.params) {
        res.status(400).send({
            message: "Request params is empty!!!!"
        });
        return;
    }

    const idPost_params = req.params.idPost

    dbManager.Post.destroy({where: {idPost_params: idPost_params}}).then(
        res.send("El post se elimino correctamente")
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "No se pudo eliminar el post."
            });
        }
    );

}


exports.createPost = createPost;
exports.updatePost =  updatePost;
exports.deletePost = deletePost;
