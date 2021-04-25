(async () => {
    /*
        import helpers
    */
    const helpersSrc = chrome.extension.getURL('/helpers.js')
    const { 
        asyncSetChromeSyncStorage,
        asyncReadFromStorage,
        shouldRunServiceOnSite,
        getTriggerChar
     } = await import(helpersSrc)

    const select = selector => document.querySelector(selector)
    const setColor = (el, color) => {
        if (color === 'green') {
            el.classList.remove('red')
            el.classList.add('green')
        } else if (color === 'red'){
            el.classList.remove('green')
            el.classList.add('red') 
        } else {
            throw new Error('Invalid color in setColor')
        }
    }
    
    const containsClassGreen = el => el.classList.contains('green')
    
    /* 
    Handle on/off button
    */
    const serviceToggle = select('#serviceToggle')
    const serviceOn = await asyncReadFromStorage('serviceOn')
    setColor(serviceToggle, serviceOn ? 'green' : 'red')
    
    serviceToggle.addEventListener('click', async(ev) => {
        let serviceOn = containsClassGreen(ev.target) ? true : false
        serviceOn = !serviceOn
        await asyncSetChromeSyncStorage({
            'serviceOn': serviceOn
        })

        const shouldRunService = await shouldRunServiceOnSite()
        setColor(serviceToggle, serviceOn ? 'green' : 'red')
        serviceToggle.textContent = serviceOn ? 'ON' : 'OFF'
    })

    /* 
    Handle trigger character input
    */
    const triggerCharInput = select("#triggerChar")
    triggerCharInput.value = await getTriggerChar()
    triggerCharInput.addEventListener('change', async (ev) => {
        await asyncSetChromeSyncStorage({
            'triggerChar': triggerCharInput.value
        })
    })
})()