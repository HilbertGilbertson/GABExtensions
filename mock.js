/*
********************
* Hilbert's Mocker
******************** 
* v1.1
* 
* A GAB extension command that uses webhooks to imitate a user, posting
* a given message with their username (or nick, if applicable) and avatar.
*
* There is no need to create any webhooks, but the Bot will need to have
* the 'Manage Webhooks' permission.
*
*/

function postMsg(whid, token, username, avatar, gMsg){
    unirest.post("https://ptb.discordapp.com/api/webhooks/" + whid + "/" + token)
        .headers({"Accept": "application/json"})
        .send({ "content": gMsg, "username": username, "avatar_url": avatar })
        .end(function (result) {
        message.delete();
    })}

if(!channel.permissionsOf(bot.user.id).has("manageWebhooks")){
    channel.createMessage("I do not have permission to manage webhooks! :cry:");
} else {
    var gMsg = commandSuffix.replace(commandSuffix.split(" ")[0] + ' ', '');
    if (typeof message.mentions != "undefined" && message.mentions != null && message.mentions.length > 0) {
        if (bot.getMemberAdminLevel(message.author.id) < 1 && bot.getMemberAdminLevel(message.mentions[0].id) > 0) {
            channel.createMessage(message.author.mention + ': You cannot mock Admins.');
        } else {
            var username = message.mentions[0].username;
            var avatar = message.mentions[0].avatarURL;
            if(avatar == null) avatar = "http://i.imgur.com/fU70HJK.png";
            if(message.mentions[0].nick){ username = message.mentions[0].nick; }

            channel.getWebhooks(function(whs){
                if(whs.length < 1) {
                    channel.createWebhook({ "name":"Hilbert's Mockhook" }, function(whc){
                        postMsg(whc.id, whc.token, username, avatar, gMsg);
                    });
                } else {
                    postMsg(whs[0].id, whs[0].token, username, avatar, gMsg);
                }});
        }
    } else {
        channel.createMessage("Please specify a user, i.e. `" + commandPrefix + commandKey + " @user message`.");
    }
}
