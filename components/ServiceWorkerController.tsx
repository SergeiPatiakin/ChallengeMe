import React from 'react'
import { callMainApi } from '../utils/clientUtils'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const updateSubscriptionOnServer = async (subscription: any) => {
  return callMainApi('POST', '/api/save-subscription/', subscription)
}

function subscribeUser(swRegistration: any) {
  const applicationServerKey = urlBase64ToUint8Array(process.env.VAPID_PUBLIC_KEY as string)
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    })
    .then((subscription: any) => {
      return updateSubscriptionOnServer(subscription)
    })
}

export class ServiceWorkerController extends React.Component {
  public componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(swReg =>
          swReg.pushManager.getSubscription().then(subscription => {
            if (!subscription) {
              subscribeUser(swReg)
            } else {
              // Subscription exists
            }
          })
        )
        .catch(err => console.error('Service worker registration failed', err))
    }
  }
  public render() {
    return null
  }
}
