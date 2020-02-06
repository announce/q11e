// @flow
'use strict'

export const scriptName = 'announce/iac'

const TOP_DOMAIN = 'atlassian.com'
const CAC_DOMAIN = 'confluence.atlassian.com'
const WAC_DOMAIN = 'www.atlassian.com'
const SAC_DOMAIN = 'support.atlassian.com'
// @TODO Store prefix preference https://developer.chrome.com/extensions/options
const PREFIX = 'ja'

export const createRedirectionUrl = (pageUrl: string): URL => {
  let url = new URL(pageUrl)
  if (!supportedHost(url)) {
    console.log(`[${scriptName}.createRedirectionUrl] unsupported host:`, url.host)
    return url
  }
  switch (true) {
    case url.host.indexOf(WAC_DOMAIN) !== -1:
      url = convertPathPrefix(url)
      break
    case url.host.indexOf(SAC_DOMAIN) !== -1:
      url = convertPathPrefix(url)
      break
    case url.host.indexOf(CAC_DOMAIN) !== -1:
      url = convertSubdomain(url)
      break
    default:
      console.warn(`[${scriptName}.createRedirectionUrl] unexpected host:`, url.host)
      break
  }
  console.log(`[${scriptName}.createRedirectionUrl] result:`, url.href)
  return url
}

const convertPathPrefix = (url: URL): URL => {
  let matcher = new RegExp(`^/${PREFIX}/?`)
  if (matcher.test(url.pathname)) {
    url.pathname = url.pathname.replace(matcher, '/')
  } else {
    url.pathname = `/${PREFIX}${url.pathname}`
  }
  return url
}

const convertSubdomain = (url: URL): URL => {
  let matcher = new RegExp(`^${PREFIX}.`)
  if (matcher.test(url.host)) {
    url.host = url.host.replace(matcher, '')
  } else {
    url.host = `${PREFIX}.${url.host}`
  }
  return url
}

const supportedHost = (url: URL): boolean => {
  console.log(`[${scriptName}.createRedirectionUrl] url.host.indexOf(TOP_DOMAIN):`, url.host.indexOf(TOP_DOMAIN))
  return (url.host.indexOf(TOP_DOMAIN) === url.host.length - TOP_DOMAIN.length)
}
