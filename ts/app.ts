import express, {Application, Request, Response} from 'express';
const fs = require('fs');
const app = express();
const port = 8080

app.use(express.json());

const getProducts = () => {

    let errReturn: any[] = [];

    try {

        return fs.readFileSync('./productos.txt', 'utf-8').split('\n');
        
    } catch (err) {

        console.log('No se pudo leer el archivo. ', err);

        return errReturn;
    }
}

let productos: any[] = getProducts();
let itemsVisits: number = 0;
let randomVisits: number = 0;


app.get('/items', (req, res)=>{

    itemsVisits++;

    let getItems = {
        products: productos,
        cantidad: productos.length 
    }

    res.json(getItems);

})

app.get('/item-random', (req, res)=>{

    const randomElement = {
        item: productos[Math.floor(Math.random() * (productos.length - 0) + 0)]
    }

    randomVisits++;

    res.json(randomElement);
})

app.get('/visitas', (req, res)=>{

    const visitas = {
        items: itemsVisits,
        itemRandom: randomVisits
    };

    res.json(visitas);

})


const server = app.listen(port, ()=>{
    console.log(`Server listening in ${port}`);
})

server.on("error", error => console.log(`ERROR! ${error}`))
