const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    return
  }
  const swRegistration = await navigator.serviceWorker.register('sw.js')
  let serviceWorker

  if (swRegistration.installing) {
    console.log('SW installing', swRegistration)
    serviceWorker = swRegistration.installing
  } else if (swRegistration.waiting) {
    console.log('SW waiting', swRegistration)
    serviceWorker = swRegistration.waiting
  } else if (swRegistration.active) {
    console.log('SW active', swRegistration)
    serviceWorker = swRegistration.active
  }

  serviceWorker.addEventListener('statechange', (e) => {
    console.log(e.target.state)
  })

  swRegistration.addEventListener('updatefound', () => {
    swRegistration.installing.addEventListener('statechange', (e) => {
      console.log('New service worker state!', e.target.state)
    })
    console.log('New service worker found!', swRegistration)
  })

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('controller changed')
  })

  navigator.serviceWorker.addEventListener('message', (e) => {
    const clientId = e.data.clientId
    const message = event.data.message
    console.log('From Client: ', clientId, message)
  })

  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage('hello')
  }

  setInterval(() => {
    swRegistration.update()
  }, 1000 * 5)
}

export default swRegister
