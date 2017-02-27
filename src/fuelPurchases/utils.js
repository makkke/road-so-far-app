const LITERS_IN_GALLON = 3.785411784

export const convertGallonsToLiters = gallons => gallons * LITERS_IN_GALLON
export const convertLitersToGallons = liters => liters / LITERS_IN_GALLON
export const mapQuantityToLiters = ({ value, unit }) => (unit === 'LITER' ? value : convertGallonsToLiters(value))

export const provinces = [
  { id: 'AB', name: 'Alberta' },
  { id: 'BC', name: 'British Columbia' },
  { id: 'MB', name: 'Manitoba' },
  { id: 'NB', name: 'New Brunswick' },
  { id: 'NL', name: 'Newfoundland & Labrador' },
  { id: 'NT', name: 'Northwest Territories' },
  { id: 'NS', name: 'Nova Scotia' },
  { id: 'NU', name: 'Nunavut' },
  { id: 'ON', name: 'Ontario' },
  { id: 'PE', name: 'Prince Edward Island' },
  { id: 'QC', name: 'Quebec' },
  { id: 'SK', name: 'Saskatchewan' },
  { id: 'YT', name: 'Yukon' },
]

export function isProvince(id) {
  return provinces.find(x => x.id === id)
}

export const states = [
  { id: 'AL', name: 'Alabama' },
  { id: 'AK', name: 'Alaska' },
  { id: 'AS', name: 'American Samoa' },
  { id: 'AZ', name: 'Arizona' },
  { id: 'AR', name: 'Arkansas' },
  { id: 'CA', name: 'California' },
  { id: 'CO', name: 'Colorado' },
  { id: 'CT', name: 'Connecticut' },
  { id: 'DE', name: 'Delaware' },
  { id: 'DC', name: 'District Of Columbia' },
  { id: 'FM', name: 'Federated States Of Micronesia' },
  { id: 'FL', name: 'Florida' },
  { id: 'GA', name: 'Georgia' },
  { id: 'GU', name: 'Guam' },
  { id: 'HI', name: 'Hawaii' },
  { id: 'ID', name: 'Idaho' },
  { id: 'IL', name: 'Illinois' },
  { id: 'IN', name: 'Indiana' },
  { id: 'IA', name: 'Iowa' },
  { id: 'KS', name: 'Kansas' },
  { id: 'KY', name: 'Kentucky' },
  { id: 'LA', name: 'Louisiana' },
  { id: 'ME', name: 'Maine' },
  { id: 'MH', name: 'Marshall Islands' },
  { id: 'MD', name: 'Maryland' },
  { id: 'MA', name: 'Massachusetts' },
  { id: 'MI', name: 'Michigan' },
  { id: 'MN', name: 'Minnesota' },
  { id: 'MS', name: 'Mississippi' },
  { id: 'MO', name: 'Missouri' },
  { id: 'MT', name: 'Montana' },
  { id: 'NE', name: 'Nebraska' },
  { id: 'NV', name: 'Nevada' },
  { id: 'NH', name: 'New Hampshire' },
  { id: 'NJ', name: 'New Jersey' },
  { id: 'NM', name: 'New Mexico' },
  { id: 'NY', name: 'New York' },
  { id: 'NC', name: 'North Carolina' },
  { id: 'ND', name: 'North Dakota' },
  { id: 'MP', name: 'Northern Mariana Islands' },
  { id: 'OH', name: 'Ohio' },
  { id: 'OK', name: 'Oklahoma' },
  { id: 'OR', name: 'Oregon' },
  { id: 'PW', name: 'Palau' },
  { id: 'PA', name: 'Pennsylvania' },
  { id: 'PR', name: 'Puerto Rico' },
  { id: 'RI', name: 'Rhode Island' },
  { id: 'SC', name: 'South Carolina' },
  { id: 'SD', name: 'South Dakota' },
  { id: 'TN', name: 'Tennessee' },
  { id: 'TX', name: 'Texas' },
  { id: 'UT', name: 'Utah' },
  { id: 'VT', name: 'Vermont' },
  { id: 'VI', name: 'Virgin Islands' },
  { id: 'VA', name: 'Virginia' },
  { id: 'WA', name: 'Washington' },
  { id: 'WV', name: 'West Virginia' },
  { id: 'WI', name: 'Wisconsin' },
  { id: 'WY', name: 'Wyoming' },
]

export const regions = [...provinces, ...states]

export function findRegion(id) {
  return regions.find(x => x.id === id)
}

export const volumeUnits = [
  { id: 'l', name: 'Liter' },
  { id: 'gal', name: 'Gallon' },
]

export const distanceUnits = [
  { id: 'km', name: 'Kilometre' },
  { id: 'mi', name: 'Mile' },
]

export const units = [
  ...volumeUnits,
  ...distanceUnits,
]

export function findUnit(id) {
  return units.find(x => x.id === id)
}

export function findVolumeUnitByRegion(region) {
  const id = isProvince(region) ? 'l' : 'gal'

  return volumeUnits.find(x => x.id === id)
}

export function findDistanceUnitByRegion(region) {
  const id = isProvince(region) ? 'km' : 'mi'

  return distanceUnits.find(x => x.id === id)
}

export function convertVolumeByRegionToLiters(region, volume) {
  if (isProvince(region)) {
    return Math.round(volume)
  }

  return Math.round(volume * 3.78541178)
}

export default {}
