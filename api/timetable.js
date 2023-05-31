import fetch from 'node-fetch'

const API_KEY = 'AIzaSyCEVR3eqktl_qjamvR2Glnpe6fdMZ4nhfk'
const SHEET_ID = '1e1sBFk5T4xyO--eFk3X4PqsCX_UovVoKpbteAiyOGTQ'
const SHEET_NAME = 'Presenter Worksheet'

let sheetData = null;
let lastUpdated = Date.now();

async function getSheetData() {
  lastUpdated = Date.now();
  const sheetNameStr = encodeURIComponent(SHEET_NAME)
  const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetNameStr}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=COLUMNS&valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

  const res = await fetch(sheetsUrl)

  console.log(`Got updated values at ${(new Date()).toLocaleString({
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Amsterdam'
  })}`)

  return (await res.json()).values
}


async function handler(request, response) {
  if (!sheetData || lastUpdated < Date.now() - 5000) {
    sheetData = await getSheetData()
  } else {
    console.log('Returning cached data')
  }

  response.status(200).json(sheetData)
}

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

export default allowCors(handler)
