const dbManager = require ('../database.config/database.manager');
const { Op } = require("sequelize");

/**
 * Creation of a post
 * @param {*} postObject JSON Object with User information
 */

async function createPost (req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // CREATING THE OBJECT TO PERSIST
    const newPostObject = {
        message: req.body.message,
        publishe_date: req.body.publishe_date,
        idUser: req.body.idUser
    }

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