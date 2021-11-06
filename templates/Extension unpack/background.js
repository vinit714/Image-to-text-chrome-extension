let id = 100;
//calling chrome api
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
        const viewTabUrl = chrome.extension.getURL('index.html?id=' + id++)
        let targetId = null;
        //checking if the opened tab id is the same as the target id
        chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
            if (tabId != targetId || changedProps.status != "complete")
                return;
            chrome.tabs.onUpdated.removeListener(listener);
            const views = chrome.extension.getViews();
            for (let i = 0; i < views.length; i++) {
                let view = views[i];
                if (view.location.href == viewTabUrl) {
                    view.setScreenshotUrl(screenshotUrl);
                    return;
                }
            }
        });

        //chrome tabs create method
        //no listener on create event because the tab’s URL may not be set at the time this event is fired
        chrome.tabs.create({ url: viewTabUrl }, (tab) => {
            targetId = tab.id;
        });
    });
});