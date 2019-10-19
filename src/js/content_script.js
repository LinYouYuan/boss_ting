/**
 * 排除Pres不受翻译
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('嘿嘿嗯哼')
  switch (request.type) {
    case 'getPeople':
      const people = document.getElementsByClassName('btn btn-greet')
      if (people) {
        sendResponse(people.length)
      }
      break
    case 'sendMsg':
      return sendResponse('sendMsg！')
  }
})
