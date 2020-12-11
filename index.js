const express = require('express');
const app = express();
const routes = require("./routes");
const PORT = 3050;


app.use(express.json());
app.use('/api/', routes);
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`)
});


//Rout nr 1
app.get('/', (req, res) => {
    res.send('h18donme@du.se');
});