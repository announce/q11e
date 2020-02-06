'use strict'
const app = require('./app')

/**
 * https://developer.chrome.com/apps/declare_permissions#manifest
 * https://developer.chrome.com/extensions/background_pages
 * https://developer.chrome.com/apps/contextMenus
 * https://developer.chrome.com/extensions/tabs#method-update
 * @param w
 * @param chrome
 */
const main = (w, chrome) => {
  const executeInActiveTab = (fn) => {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, (tabs) => {
      tabs.map(fn)
    })
  }

  const redirect = (pageUrl) => {
    const url = app.createRedirectionUrl(pageUrl)
    if (url.href === pageUrl) {
      console.log('Skipping redirection as target is the same to given URL:', url)
      return
    }
    executeInActiveTab((tab) => {
      console.log('tab:', tab)
      chrome.tabs.update(tab.id, {
        url: url.href
      })
    })
  }

  chrome.runtime.onInstalled.addListener(() => {
    console.log('chrome.runtime.onInstalled:', app.scriptName)
    chrome.contextMenus.create({
      title: '[iAC] Toggle the language switch',
      contexts: ['page'],
      id: app.scriptName
    })
  })

  chrome.contextMenus.onClicked.addListener((info) => {
    console.log('chrome.contextMenus.onClicked:', info)
    if (info.menuItemId === app.scriptName && 'pageUrl' in info) {
      return redirect(info.pageUrl)
    }
  })
}

main(window, chrome)
