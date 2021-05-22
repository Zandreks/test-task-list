require('custom-env').env()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require('path')
const multer = require('multer')
const upload = multer()
const app = express();
const initial = require("./other/instaldb")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'build')))
app.use(upload.array())
app.use(express.static('public'))
app.use(cors(''))
/***********************************************************************************************/
/*                                      CONSTANTS                                              */
/***********************************************************************************************/
const db = require("./models")

/***********************************************************************************************/
/*                                      DATABASE                                               */
/***********************************************************************************************/
if (process.env.PRODUCTION === "true") {
    db.sequelize.sync()

} else {
    db.sequelize.sync({force: true}).then(() => {
        console.log("Drop and Resync Db")
        initial()
    })
}


/***********************************************************************************************/
/*                                  ASSIGNING ROUTES                                           */
/***********************************************************************************************/

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/task.routes')(app);

/***********************************************************************************************/

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(process.env.PORT, () => {
    console.log('Server start')
})
