const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

function findAll(){
    const jasonData = fs.readFileSync(path.join(__dirname, "../data/products.json"));
    const data = JSON.parse(jasonData);
    return data
};
function writeFile(data){
    const dataString = JSON.stringify(data, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), dataString)
};


const controller = {
    list: (req,res) => {
        const data = findAll();
        res.render("menu-products", {products: data});
    },
    detail: (req,res) => {
        const data = findAll();
        platoEncontrado = data.find(plato =>{
            return plato.id == req.params.id
        })
        res.render("product-detail", {plato: platoEncontrado})

    },
    create: (req,res) => {
        res.render("product-create-form");
    },
    store: (req,res) => {
        const data = findAll();
        const newProduct = {
            id: data.length + 1,
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description
        }

        data.push(newProduct)

        writeFile(data);
        res.redirect("/products/detail/" + newProduct.id);
    },
    edit: (req,res) => {
        const data = findAll();
        platoAEditar = data.find(plato => {
            return plato.id == req.params.id
        })

        res.render("product-update-form",{plato: platoAEditar});
    },
    update: (req,res) => {
        const data = findAll();
        platoAEditar = data.find(plato => {
            return plato.id == req.params.id
        })
        platoAEditar.name = req.body.name;
        platoAEditar.price = req.body.price;
        platoAEditar.description = req.body.description;

        writeFile(data);

        res.redirect("/products/detail/" + platoAEditar.id);

    }


}

module.exports = controller;
