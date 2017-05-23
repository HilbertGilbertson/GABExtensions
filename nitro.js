/*
********************
* Nitro Users
********************
* v1.0
*
* A GAB extension command that displays a simple embedded message,
* listing every user on the guild who has Discord Nitro.
*
*/

var nitro = '';
guild.members.map(usr => {
  if (usr.avatar != null) {
    if (usr.avatar.startsWith("a_")) {
      nitro += usr.mention + "\n";
    }
  }
});

channel.createMessage({
  embed: {
    description: "The following users on this guild have nitro:\n\n" + nitro,
    color: 8160453,
    thumbnail: {
      "url": "http://i.imgur.com/Ls5pRMF.png"
    },
    author: {
      name: "Nitro Users",
      icon_url: "http://i.imgur.com/H5CwSY2.png"
    }
  }
});
