
// opne website as soon as the user installs the extesion 
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.tabs.create({
            url: "https://www.wordwise.foo/"
        });
        // localStorage is not available in service workers. Using chrome.storage.local instead.
        chrome.storage.local.set({
            wordwiseRandomWordIndex: '0',
            wordwiseAllWordsList: []
        });
    }
});


chrome.runtime.onStartup.addListener(() => {
    chrome.action.openPopup();
})