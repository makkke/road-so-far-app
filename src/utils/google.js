export const geocoder = new google.maps.Geocoder()

export const autocomplete = new google.maps.places.AutocompleteService()

export const places = new google.maps.places.PlacesService(document.createElement('div'))

export const getAddressComponents = (address) => {
  const addressComponents = address.address_components
  const city = addressComponents.find(x => x.types[0] === 'locality').long_name
  const region = addressComponents.find(x => x.types[0] === 'administrative_area_level_1').short_name
  const country = addressComponents.find(x => x.types[0] === 'country').long_name

  return { city, region, country }
}

export const getCurrentLocation = () => (
  new Promise((resolve, reject) => {
    const options = {
      timeout: 5000,
      maximumAge: 1000 * 60 * 60 * 24, // 1 day
    }

    // TODO: add a fallback to navigator.geolocation.getCurrentPosition
    // var latLong;
    // $.getJSON("http://ipinfo.io", function(ipinfo){
    //     console.log("Found location ["+ipinfo.loc+"] by ipinfo.io")
    //     latLong = ipinfo.loc.split(",")
    // })

    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      geocoder.geocode({ location }, (results, status) => {
        if (status !== 'OK') {
          reject(status)
          return
        }

        const [address] = results
        if (!address) {
          reject(new Error('No Address'))
          return
        }

        resolve(getAddressComponents(address))
      })
    }, err => reject(err), options)
  })
)

export default {}
