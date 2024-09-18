const fs = require('fs')

export default function (req, res){
    let data = require('../../../Data/Chat.json');
    console.log(req.body.chatName)
    delete data[req.body.chatName]
    fs.writeFile('./Data/Chat.json', JSON.stringify(data), (e)=>{
        if(!e) res.send({res: `${req.body.chatName} file was deleted`})
        console.log(e)
        res.status(500).send({res: 'Internal server problem comes !!! '});
    });
}