const app = require('./routes');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000

require('dotenv/config');
mongoose.set('useFindAndModify', false);

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true,
        useNewUrlParser: true 
    },
    () => console.log('mongoose connection')
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
