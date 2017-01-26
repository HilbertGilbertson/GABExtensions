/*
********************
* Hilbert's LMGTFY
******************** 
* v1.0
* 
* A GAB extension command that takes a query and creates a tinyurl for 
* the query on lmgtfy.com. Responds with an embedded message so the
* link is clickable while not providing a content preview of the URL
* (which would show the LMGTFY logo).
*
*/

if(commandSuffix.length < 1){
	channel.createMessage("Please provide a query e.g.`lmgtfy how to use a knife and fork`");
} else {
	message.delete();
	var iie = 0;
  	if(commandSuffix.substring(0, 3) == "!1 ") { iie = 1; commandSuffix = commandSuffix.substring(3); }
	unirest.get("http://tinyurl.com/api-create.php?url=http://lmgtfy.com/?iie=" + iie + "&q=" + encodeURI(commandSuffix))
		.headers({"Accept": "text/html"})
        .end(function (result) {
		if(result.statusCode != 200 || result.body.indexOf("http://") != 0){
			channel.createMessage("Something went wrong. That's all I have to say about that.");
		} else {
			channel.createMessage({embed: {color: '16711680',fields: [{name: 'All you need to know about ' + commandSuffix + ':', value: result.body}]}});
		}
	});
}
