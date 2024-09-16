const fs = require('fs')

export default function(req, res){
    console.log(req.body)
    let chat = require('../../../Data/Chat.json')
    chat[req.body.name] = req.body.chats;
    console.log(chat)
    fs.writeFile('./Data/Chat.json', JSON.stringify(chat), (e)=>{
        if(!e) res.send({res: `${req.body.name} chat saved.`})
        console.log(e)
        res.send({res: `${req.body.name} fail to save due to Internal servar error !!!`})
    })
}