'use strict'

const URL = document.URL;

function deleteEmoji(mess) {
  const emojis = mess.querySelectorAll('img[class*="emoji"]'); // There are 2 classes emoji_css
  // and emoji, this will detect both
  const stickers = mess.querySelectorAll('img[class*="gift"]'); // And for stickers

  emojis.forEach((smile) => smile.parentElement
  .replaceChild(document.createTextNode('<[smileWasHere]>'), smile));

  stickers.forEach((sticker) => sticker.parentElement
  .replaceChild(document.createTextNode('<[stickerWasHere]>'), sticker));

  console.log(`${emojis.length + stickers.length} smiles/stickers was replaced.'`);
}

// Main block. Above only definitions.
{
  function deleter() {
    const emojiBar = document.querySelector('.im-chat-input--smile-wrap'); // it's a bar
    emojiBar ? emojiBar.remove() : {}; // with smiles

    const messages = document.querySelectorAll('div.im-mess--text'); // all messages
    // have this class

    messages ? messages.forEach((message) => deleteEmoji(message)) : {};
  }

  var timerId = setInterval(deleter, 1000);
}
