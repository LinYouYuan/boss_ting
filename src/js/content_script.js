config = {
  status: 'stop',
}

const sleep = time =>
  new Promise((resolve, reject) => setTimeout(resolve, time))

const beginCall = async people => {
  for (let item of people) {
    item.click()
    await sleep(1111)
  }
  const container = document
    .getElementsByClassName('sync-container page-container')[0]
    .getElementsByTagName('iframe')[0].contentWindow.document.documentElement
  container.scrollTop = container.scrollHeight - container.offsetHeight
  await sleep(3333)
  const peopleDom = document
    .getElementsByClassName('sync-container page-container')[0]
    .getElementsByTagName('iframe')[0]
    .contentWindow.document.getElementsByClassName('btn btn-greet')
  return beginCall(peopleDom)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'start':
      try {
        const people = document
          .getElementsByClassName('sync-container page-container')[0]
          .getElementsByTagName('iframe')[0]
          .contentWindow.document.getElementsByClassName('btn btn-greet')
        console.log('people', people)
        if (people && people.length > 0) {
          sendResponse('正在开始')
          beginCall(people)
          config.status = 'start'
        }
      } catch (error) {
        sendResponse('不是BOSS页面，或者页面未加载完')
        config.status = 'stop'
      }
      break
    case 'stop':
      console.log('stop')
      break
  }
})
