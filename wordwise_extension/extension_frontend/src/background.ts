
// opne website as soon as the user installs the extesion 
chrome.runtime.onInstalled.addListener(( { reason } ) => { 
    if (reason === 'install') { 
        chrome.tabs.create( { 
            url : "https://mini-project-sepia-nine.vercel.app/"
        });
        localStorage.setItem('wordwiseRandomWordIndex','0');
        chrome.storage.local.set({wordwiseAllWordsList : []})
    }
});


chrome.runtime.onStartup.addListener(()=> { 
    chrome.action.openPopup();
})