const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const moment = require("moment-timezone")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))
prefix = setting.prefix

module.exports = welcome = async (dha, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await dha.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await dha.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://i.postimg.cc/SN54m6LW/SAVE-20210728-133334.jpg'
            }
            if (anu.action == 'add' && mem.includes(dha.user.jid)) {
            dha.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik ${prefix}menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(dha.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await dha.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = dha.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                teks = `á´Êá´ ${anu_user}ð\nÊá´á´ á´ ÉªÉ´á´á´ á´ á´sá´á´ É¢Êá´á´á´,respeite a todos os menbros \n\n 
ââââââââââââââââ
âââââã *_á´á´Êá´sá´É´á´á´ÃÃá´_* ãâââââ
ââââââââââââââââ
â â·ï¸ *É´á´á´á´* :
â 
â â·ï¸ *Éªá´á´á´á´* :
â 
â â·ï¸ *É¢á´É´á´Êá´* :.
ââââââââââââââââ
respeite os adms pfv ou vou ter que dar ban , nÃ£o Ã© obrigado se apresentar , seja ativo ou saia do grupo e abra espaÃ§o pra menbros ativos`
	            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`)
                imageMsg = (await dha.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${teks}`, footerText: 'Herman BotzÃ°Å¸â¡Â²Ã°Å¸â¡Â¨', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await dha.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                dha.relayWAMessage(prep)
}
            if (anu.action == 'remove' && !mem.includes(dha.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await dha.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = dha.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                memeg = mdata.participants.length
                out = `.      ããããããâ¢ã    ãï¾ããã
    ãã.ããã.ããã  ãã.ãããããããã   ãã.
    ã.ãã      ãã        à¶   ãã    .    â¢
    â¢            ${anu_user} was E j e c t e d
                      1 impostor restante   ãã.
    ã ããããã ããããï¾ããã.ã      ãã
ðð¯ð¢ð¬ð¨ ð©ðð«ð ð¯ð¨ðð ðªð®ð ð¬ðð¢ð® @${num.split('@')[0]} ðð¨ð¢ ðð¨ð¢ ðð¨ð¢,ðð¨ð¢ ðð ððð«ð ð©ð«ðð­ð ðªð®ðð¦ ð¬ðð¢ð® ðð¨ ð ð«ð®ð©ð¨ ð¦ðð¦ð ð ð©ð¢ð¤ð ðð¨ ððð©ðð­ððð`
                buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`)
                imageMsg = (await dha.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${out}`, footerText: 'Herman BotzÃ°Å¸â¡Â²Ã°Å¸â¡Â¨', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await dha.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                dha.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}