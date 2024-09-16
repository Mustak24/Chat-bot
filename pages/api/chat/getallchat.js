const fs = require('fs')

export default function(req, res){
    let allChat = require('../../../Data/Chat.json')
    res.send(Object.keys(allChat))
}