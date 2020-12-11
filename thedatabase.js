// require sqlite to be able to use CRUD-OPERATIONS on our database
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const routes = require('./routes');

// create a database promise object by connecting to database
const dbPromise = (async () => {
    return open({
        filename: './thedatabase.sqlite',
        driver: sqlite3.Database
    });
})();

const login = async (data) => {
    console.log(data);
    try {
        const dbCon = await dbPromise
        const username = await dbCon.get(`SELECT username FROM users WHERE username=? AND password=?`, [data.username, data.password]);
        if (username === undefined) {
            return {error: 'Ouups! Something went wrong, check your username and password'};
        }
        else {
            return username;
        }
    }
    catch (error) {
          throw new Error('WARNING! SELF DESTRUCT IN 3 SECONDS!');
    }
}


/////USERS START/////

const getUsers = async () => {
    //returnera användare
    try {
        const dbCon = await dbPromise;
        const users = await dbCon.all('SELECT * FROM users ORDER BY id ASC');
        return users;

    }
    catch (error) {
        throw new Error('WARNING! SELF DESTRUCT IN 3 SECONDS!');
    }
};


const userById = async() => {
    try {
        const dbCon = await dbPromise;
        const users = await dbCon.all('SELECT * FROM users ORDER BY id ASC')
        return users;
    }
    catch (error) {
        throw new Error('WARNING! SELF DESTRUCT IN 3 SECONDS!');
    }
}




/////USERS END/////


//////PROD START//////

const getProducts = async () => {
    //returnera produkter
    try {
        const dbCon = await dbPromise;
        const products = await dbCon.all('SELECT * FROM products ORDER by id ASC')
        return products;
    }
    catch (error) {
        throw new Error('WARNING! SELF DESTRUCT IN 3 SECONDS!');
    }
};

const productById = async(id) => {
    try {
        const dbCon = await dbPromise;
        const products = await dbCon.get("SELECT * FROM products WHERE id = ?", [id]);
        return products;
    }
    catch (error) {
        throw new Error('WARNING! SELF DESTRUCT IN 3 SECONDS!');
    }
}



const addProduct = async (data) => {
    try {
        const dbCon = await dbPromise;
        await dbCon.run(`INSERT INTO products (name, description, price) VALUES(?,?,?)`, [data.name, data.description, data.price]);
        return { status: "ok!"};
    }
    catch(error) {
        throw new Error('WARNING! SELF DESTRUCT IN 3 SECONDS!');
    }
}

const updateProduct = async (id, data) => {
    try {
        const dbCon = await dbPromise;
        await dbCon.run(`UPDATE products SET name=?, description=?, price=? WHERE id=?`, [data.name, data.description, data.price, id]);
        return 'Product is now updated'
    }
    catch (error) {
        throw new Error(error)
    }
}

const deleteProduct = async (id) => {
    try {
        const dbCon = await dbPromise;
        await dbCon.run("DELETE FROM products WHERE id=?", [id]);
        return {status: 'Product is now deleted form the database'};
    }
    catch (error) {
        throw new Error('WARNING! SELF DESTRUCT IN 3 SECONDS!');
    }
}

//////PROD END//////

module.exports = {
    getUsers: getUsers,
    getProducts: getProducts,
    productById: productById,
    login: login,
    userById: userById,
    deleteProduct: deleteProduct,
    addProduct: addProduct,
    updateProduct: updateProduct
};