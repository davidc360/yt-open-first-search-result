(async () => {
//wrap function as an async

    const helpersSrc = chrome.extension.getURL('/helpers.js')
    const { getSearchQuery, extractVideoLink, shouldRunServiceOnSite, getTriggerChar} = await import(helpersSrc)
    
    async function openFirstVideo() {
        if(!await shouldRunServiceOnSite()) return
        const triggerChar = await getTriggerChar()

        if (getSearchQuery()?.slice(-1) === triggerChar) {    
            const videoLink = extractVideoLink()
            window.open(videoLink, "_self")
        }
    }

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.message === 'TabUpdated') {
            openFirstVideo()
        }
    })
    
})()