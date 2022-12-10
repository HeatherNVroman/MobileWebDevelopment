//installation
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('StockProjection').then(function (cache) {
      return cache.addAll([
	'/MobileWebDevelopment/BankingInformation.html',
	'/MobileWebDevelopment/EmailAddress.html',
	'/MobileWebDevelopment/Home.html',
	'/MobileWebDevelopment/HomeAddress.html',
	'/MobileWebDevelopment/InvestmentHistory.html',
	'/MobileWebDevelopment/manifest.json',
	'/MobileWebDevelopment/StockProjection.css',
	'/MobileWebDevelopment/UpdatePassword.html',
	'/MobileWebDevelopment/UserInformation.html',
    ]);
  }));
});
//registration
navigator.serviceWorker.ready.then((registration) => {
  registration.update();
});
//waiting
const addResourcesToCache = async (resources) => {
  const cache = await caches.open('v1');
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open('v1');
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, https://github.com/HeatherNVroman/MobileWebDevelopment}) => {
// Get response from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

//Use the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('Welcome!', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  //Get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(https://github.com/HeatherNVroman/MobileWebDevelopment);
    if (fallbackResponse) {
      return fallbackResponse;
    }
//Response prompted when no other response is prompted
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};
//activation
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (StockProjection) {
      return Promise.all(
        cacheNames
          .filter(function (StockProjection) {
          })
          .map(function (StockProjection) {
            return caches.delete(StockProjection);
          }),
      );
    }),
  );
});
//offline
self.addEventListener('fetch', function (event) {
  // Parse the URL:
  var requestURL = new URL(event.request.url);

  // Handle requests to a particular host specifically
  if (requestURL.hostname == 'ahttps://github.com/HeatherNVroman/MobileWebDevelopment') {
    event.respondWith();
    return;
  }
  // Routing for local URLs
  if (requestURL.origin == location.origin) {
    // Handle article URLs
    if (/^\/article\//.test(requestURL.pathname)) {
      event.respondWith();
      return;
    }
    if (/\.webp$/.test(requestURL.pathname)) {
      event.respondWith();
      return;
    }
    if (request.method == 'POST') {
      event.respondWith(;
      return;
    }
    if (/cheese/.test(requestURL.pathname)) {
      event.respondWith(
        new Response('Flagrant cheese error', {
          status: 512,
        }),
      );
      return;
    }
  }

  //default pattern
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});