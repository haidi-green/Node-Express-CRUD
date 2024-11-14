const express = require('express')
const app = express()
const mysql = require('mysql2')
const port = 3000
var cors = require('cors')


const query = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shopping"

})

app.use(express.json())
app.use(cors())

app.get('/products', (req, res) => {
    query.execute("select * from products", (err, data) => {
        if (err) {
            res.json({message: `error/n`, err})
        }
        else {
            res.json({message: `200`, data})
        }
    })
})

app.get('/products/:id', (req, res) => {
    const {id} = req.params

    query.execute(`select * from products where id='${id}'`, (err, data) => {
        if (err) {
            res.json({message: "error"}, err)
        }
        else {
            res.json({message: "200", data})
        }
    })
})

app.post('/products', (req, res) => {

    const {name, brand, price} = req.body
    query.execute(`insert into products(name, brand, price)
    values('${name}', '${brand}', '${price}')`)

    res.json({message: "added!"})
})

app.delete('/products', (req, res) => {

    const {id} = req.body
    query.execute(`delete from products where id='${id}'`, (err, data) => {
        if (err) {
            res.json({message: "error", err})
        }
        else {
            res.json({message: `deleted!`, data})
        }
    })
})

app.put('/products', (req, res) => {

    const {id, name, brand, price} = req.body
    query.execute(`update products set name='${name}', brand='${brand}', price='${price}' where id='${id}'`, (err, data) => {
        if (err) {
            res.json({message: "error", err})
        }
        else {
            res.json({message: `updated!`, data})
        }
    })
})

app.listen(port, () => console.log(`working on port ${port}!`))