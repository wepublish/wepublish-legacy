export * from './version'

// Tell typescript we're in a ServiceWorker.
declare var self: ServiceWorkerGlobalScope

export const cacheKey = 'wepublish-cache-v1'

async function cacheCoreResources() {
  const cache = await caches.open(cacheKey)
  return cache.addAll(['/', '/static/client.js'])
}

self.addEventListener('install', e => {
  console.log(`Install ${e}`)
  e.waitUntil(cacheCoreResources())
})

self.addEventListener('activate', e => {
  console.log(`Activate ${e}`)
})

self.addEventListener('fetch', e => {
  console.log(`Fetch ${e.request.url}`)
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) return response
      return fetch(e.request)
    })
  )
})
