/*
    Helpers
*/
import {
    asyncReadFromStorage,
    asyncSetChromeSyncStorage
} from '/helpers.js'

// set default prefs
chrome.runtime.onInstalled.addListener(function() {
    const serviceOn = asyncReadFromStorage("serviceOn")
    const triggerChar = asyncReadFromStorage("triggerChar")

    if (serviceOn === null || serviceOn === undefined)
        asyncSetChromeSyncStorage({'serviceOn': true})
    if (triggerChar === null || triggerChar === undefined)
        asyncSetChromeSyncStorage({'triggerChar': "*"})
})