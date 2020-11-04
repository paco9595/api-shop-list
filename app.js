const app = require('./routes');
const mongoose = require('mongoose');
const port = process.env.PORT || 3977

mongoose.set('useFindAndModify', false);

mongoose.connect(
    process.env.DB_CONNECTION || 'mongodb+srv://villarrealesList:3EMXaLYJqChaBIgl@cluster0.6fz6y.mongodb.net/shopList',
    { useUnifiedTopology: true,
        useNewUrlParser: true 
    },
    () => console.log('mongoose connection')
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
