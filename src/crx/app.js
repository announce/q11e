// @flow
'use strict'

export const scriptName = 'announce/icac'

const TOP_DOMAIN = 'atlassian.com'
const CAC_DOMAIN = 'confluence.atlassian.com'
const WAC_DOMAIN = 'www.atlassian.com'
// @TODO Store prefix preference https://developer.chrome.com/extensions/options
const PREFIX_JA = 'ja'

export const createRedirectionUrl = (pageUrl: string): URL => {
  const url = new URL(pageUrl)
  if (!supportedHost(url)) {
    console.log(`[${scriptName}.createRedirectionUrl] unsupported host:`, url.host)
    return url
  }
  const JA_WAC = `${PREFIX_JA}.${TOP_DOMAIN}`
  const JA_CAC = `${PREFIX_JA}.${CAC_DOMAIN}`
  switch (url.host) {
    case WAC_DOMAIN:
      url.host = JA_WAC
      break
    case JA_WAC:
      url.host = WAC_DOMAIN
      break
    case CAC_DOMAIN:
      url.host = JA_CAC
      break
    case JA_CAC:
      url.host = CAC_DOMAIN
      break
    default:
      console.error(`[${scriptName}.createRedirectionUrl] unexpected host:`, url.host)
      break
  }
  console.log(`[${scriptName}.createRedirectionUrl] result:`, url.href)
  return url
}

const supportedHost = (url: URL): boolean => {
  console.log(`[${scriptName}.createRedirectionUrl] url.host.indexOf(TOP_DOMAIN):`, url.host.indexOf(TOP_DOMAIN))
  return (url.host.indexOf(TOP_DOMAIN) === url.host.length - TOP_DOMAIN.length)
}
