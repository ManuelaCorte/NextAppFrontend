import {express} from "express"
import {serveStatic} from "serve-static"
import {path} from "path"



const app = express()

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)

//http://localhost:3000/messages will be providing the backend API.
//http://localhost:8080/#/ will be providing our client service.