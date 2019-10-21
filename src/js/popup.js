function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message, response => {
      if (callback) callback(response)
    })
  })
}

function init() {
  const btnStart = document.getElementById('btn-start')
  btnStart.onclick = () => {
    sendMessageToContentScript({ type: 'start' }, response => {
      const peopleNum = document.getElementById('desc')
      console.log('response', response)
      peopleNum.innerText = response
    })
  }
  // btnClose.onclick = () => {
  //   if (config.open) {
  //     config.open = false;
  //     btnClose.innerText = '打开';
  //   } else {
  //     config.open = true;
  //     btnClose.innerText = '关闭';
  //   }
  // }
}

init()
