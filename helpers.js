export function formatCurrency (value) {
  /*
  return CurrencyFormatter.format(value, {
    currency: 'USD',
    symbol: '$',
    group: ','
  })
  */
}

export function formatDateTime (value, type) {
  value = new Date(value)
  if (typeof value !== 'object') {
    return ''
  }
  if (
    value.getUTCFullYear() == 1970 &&
    value.getUTCMonth() == 0 &&
    value.getUTCDate() == 1
  ) {
    return ''
  }

  let month = value.getMonth() + 1

  let day = value.getDate()

  let year = value.getFullYear()

  let hour = value.getHours()

  let minute = value.getMinutes()

  let ap = 'PM'

  if (hour < 12) {
    ap = 'AM'
  } else {
    if (hour != 12) {
      hour -= 12
    }
  }

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }

  if (type == 'datetime') {
    return month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ' ' + ap
  } else {
    return month + '/' + day + '/' + year
  }
}

export function formatNumber (value) {
  if (!value || isNaN(value)) {
    return 0
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatPercentage (value) {
  value = Math.round(value * 10000) / 100
  return value + '%'
}

export function getColumnValue (data, prop) {
  prop = prop.split('.')
  let a

  let len

  let value = data[prop[0]]
  for (a = 1, len = prop.length; a < len; a++) {
    value = value[prop[a]]
  }
  return value
}

export function newObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function unformatNumber (value) {
  if (!value) {
    return 0
  }
  return value.toString().replace(/,/g, '') * 1
}
