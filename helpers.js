export function getSearchQuery() {
    const searchField = document.querySelector("input")
    return searchField && searchField.value
}

export function extractVideoLink() {
    const firstResultRawHTML = document.querySelector('ytd-video-renderer').outerHTML
    const firstVideoLink = findLinkFromText(firstResultRawHTML)
    return firstVideoLink
}

export function findLinkFromText(text) {
    const re = /(\bwatch).*(?=")/
    // regex explanation:
    // (\bwatch) find the word "watch"
    // .* match any character unlimited times
    // (?= ") look ahead to find the symbol "
    // basically, match all characters between "watch" and "
    const videoLink = text.match(re)
    return videoLink
}

export const asyncSendMessage = async (message) => (
    new Promise(resolve => {
        chrome.runtime.sendMessage(message, resp => resolve(resp))
    })
)

export const asyncSetChromeSyncStorage = async(obj) => (
    new Promise(resolve => {
        chrome.storage.sync.set(obj, resp => resolve(resp))
    })
)

// read from storage asynchronously
export const asyncReadFromStorage = (key, local = false) => (
    new Promise((resolve, reject) => {
        chrome.storage.sync.get(key, function(result) {
            resolve(result[key])
        })
    })
)

export async function shouldRunServiceOnSite() {
    return await asyncReadFromStorage("serviceOn")
}

export async function getTriggerChar() {
    return await asyncReadFromStorage("triggerChar")
}