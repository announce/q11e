// @flow
'use strict'

export const FORM_TYPES: Object = {
  'satisfactionFeedback': 'SatisfactionFeedbackForm',
  'translationRequest': 'TranslationRequestForm'
}

export const MEEPLE: Object = {
  mogawa: chrome.extension.getURL('image/Meeples-Vania.png'),
  ahirama: chrome.extension.getURL('image/Meeples-Angie.png')
}

export const scriptName = 'github.com/announce/icac'

const CAC_DOMAIN = 'confluence.atlassian.com'
const PREFIX_JA = 'ja.'

export const createRedirectionUrl = (pageUrl: string): URL => {
  const url = new URL(pageUrl)
  if (url.host.lastIndexOf(CAC_DOMAIN) < 0) {
    return url
  }
  switch (url.host) {
    case CAC_DOMAIN:
      // @TODO Store prefix preference https://developer.chrome.com/extensions/options
      url.host = PREFIX_JA + CAC_DOMAIN
      break
    default:
      url.host = CAC_DOMAIN
      break
  }
  console.log('createRedirectionUrl:', url.href)
  return url
}
