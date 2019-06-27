import webpush from 'web-push'
import { vapid } from './conf'
import * as mainQueries from './queries/main'

export const webPushSetup = () => {
  webpush.setVapidDetails(`mailto:${vapid.vapidEmail}`, vapid.vapidPublicKey, vapid.vapidPrivateKey)
}

export const sendUpdateCurNotifications = async (curId: string) => {
  const notificationFields = (await mainQueries.getCurNotificationFields({ curId }))!
  const subscriptionResults = await mainQueries.getSubscriptionsByChallengeUserRound({ curId })
  const payload = {
    notificationType: 'curUpdated',
    ...notificationFields,
  }
  subscriptionResults.forEach(result => {
    webpush.sendNotification(result.subscription, JSON.stringify(payload))
  })
}
