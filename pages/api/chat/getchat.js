export default function(req, res){
    let chat = require('../../../Data/Chat.json')
    res.send(chat[req.body.name] || [])
}