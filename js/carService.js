import { preCacheDetailsPage } from './carPageService.js'
import { API_URL_LATEST } from './constants.js'
import { appendCars } from './template.js'
import { addCars, getCars, getLastItemId } from './clientStorage.js'

export const loadCars = async () => {
  document.getElementById('connection-status').innerHTML = await fetchPromise()
  const cars = await getCars()
  appendCars(cars)
}

const fetchPromise = () => {
  const promiseRequest = new Promise(async (resolve) => {
    try {
      await loadCarsRequest()
    } catch {
      resolve('No connection')
    }

    resolve('Connection OK')
  })
  const promiseHanging = new Promise((resolve) => {
    setTimeout(resolve, 3000, 'Connection hanging')
  })
  return Promise.race([promiseRequest, promiseHanging])
}

export const loadCarsRequest = async () => {
  const requestURL = `${API_URL_LATEST}?carId=${await getLastItemId()}`
  const response = await fetch(requestURL)
  const data = await response.json()
  await addCars(data.cars)
  data.cars.forEach(preCacheDetailsPage)
}
