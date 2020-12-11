const routes = require('express').Router();
const dbService = require('./thedatabase')
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const fs = require('fs').promises;



/////USERS START/////
//route for all users
routes.get('/users/', async (req, res) => {
    try {
        const users = await dbService.getUsers();
        res.json(users);
    }
    catch (error) {
        res.json('Something went wrong, users could not be extracted from database.');
    }
});

//route for recieving only a single user
routes.get('/users/:id', async (req, res) => {
    const users = await dbService.userById();
    const user = users.find((users) => {
        return users.id == req.params.id;
    });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404)
            .json(`User with id: ${req.params.id} not found`);
    }
});

//Login for user
routes.post('/login/', async (req, res) => {
    try {
        const username = await dbService.login(req.body);
        res.json(username);
    }
    catch (error) {
        res.json("Login failed!")

    }
});

/////USERS END/////


/////PRODUCT start/////
//route for all products
routes.get('/products/', async (req, res) => {
    try {
        const product = await dbService.getProducts();
        res.json(product);
    }
    catch (error) {
        res.json('Something went wrong, productss could not be extracted from database.');
    }
});

//route to recieve a single product
routes.get('/products/:id', async (req, res) => {
    try {
        const product = await dbService.productById(req.params.id);
        if (product) {
            res.json(product);
        }
        else {
            res.json(`Product with ID: ${req.params.id} is not part of the catalog`)
        }
    }
    catch {
        console.log(error)
    }
});


//add product
routes.post('/products/', async (req, res) => {
    if (req.body.name.length > 0 &&
        req.body.name.length < 40 &&
        req.body.description.length < 128 &&
        req.body.price.length > 0) {
        try {
            const addedProd = await dbService.addProduct(req.body);
            console.log(addedProd);
            res.json('Product Added!')

        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.json('The product you tried to add could not be added.')
    }
});

//Update Product
routes.patch('/products/:id', async (req, res) => {
    if (req.body.name.length > 0 &&
        req.body.name.length < 40 &&
        req.body.description.length < 128 &&
        req.body.price.length > 0 &&
        await dbService.productById(req.params.id)) {
        try {
            const updatedProd = await dbService.updateProduct(req.params.id, req.body);
            console.log(updatedProd);
            res.json(`Product with ID: ${req.params.id} successfully updated.`)
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.json('The update was not successful.')
    }
});


//Delete product
routes.delete('/products/:id', async (req, res) => {
    try {
        const p = await dbService.productById(req.params.id);
        await dbService.deleteProduct(req.params.id);
        if (p) {
            res.json(`product with id ${req.params.id} is deleted`);
        }
        else {
            res.json(`Product with ${req.params.id} does not exist`)
        }
    }
    catch (error) {
        res.json(error);
    }
});



//Add file to product
routes.post('/files/:id', upload.array('file'), async (req, res) => {
    const fileUpload = req.files;//Uppladdad fil
    let allOK = false;
    for (let i = 0; i < fileUpload.length; i++) {
        const file = fileUpload[i];
        const exts = file.originalname.split('.');
        const fileEnd = exts[exts.length - 1];
        const product = req.params.id + '-' + i;
        //Skapa vårt filnamn
        const fileName = './upload/' + product + '.' + fileEnd;
        console.log(fileName);
        try {
            //Flytta vår fil
            const fileWrite = await fs.rename(file.path, fileName);
            if (!fileWrite) {
                const allOK = true;
            }
        }
        catch (error) {
            console.log(error);
            await fs.unlink(file.path)
            res.status(400).json(error);
        }
    }
    if (allOK) {
        res.json({ "Status": " not ok" });
    }
    else {
        res.json({ "Status": " Ok" });
    }
});

/////PRODUCT END/////

//Export module --> route
module.exports = routes; 