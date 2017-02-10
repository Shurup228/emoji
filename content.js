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
    const messages = document.querySelectorAll('div.im-mess--text'); // all messages
    // have this class

    const emojiBar = document.querySelector('.im-chat-input--smile-wrap'); // it's a bar
    emojiBar ? emojiBar.remove() : {}; // with smiles

    messages.forEach((message) => deleteEmoji(message));
  }

  if (URL[URL.length - 1] !== 'm') { // When we in vk.com/im, only if dialog opened this will work

    var timerId = setInterval(deleter, 1000);

    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.type === 'button-triggered' && request.data === 'disable') {
        alert('lol');
        clearInterval(timerId);
      } else {
        alert('kek');
        timerId = setInterval(deleter, 1000);
      }
    });
  }
}
