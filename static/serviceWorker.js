console.log('Hello Service Worker')
self.addEventListener('push', function(event) {
  const data = event.data.json()
  // const text = event.data.text()
  const notificationType = data.notificationType

  let title = 'New Update'
  let body = 'Open challengeme.today'
  if (notificationType === 'curUpdated') {
    const userName = data.userName
    const challengeName = data.challengeName
    title = 'Round Completed'
    body = `${userName} has a new result in ${challengeName}`
  }

  const options = {
    body,
    badge: 'static/owl-icon-32x32.png',
    icon: 'static/like-a-sir.png',
  }

  event.waitUntil(self.registration.showNotification(title, options))
})
self.addEventListener('notificationclick', function(event) {
  event.waitUntil(clients.openWindow('/'))
})
