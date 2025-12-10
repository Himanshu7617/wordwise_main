/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

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
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwREFBMEQ7QUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2xELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2YsR0FBRyxFQUFFLDJCQUEyQjtTQUNuQyxDQUFDLENBQUM7UUFDSCx3RkFBd0Y7UUFDeEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3JCLHVCQUF1QixFQUFFLEdBQUc7WUFDNUIsb0JBQW9CLEVBQUUsRUFBRTtTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFHSCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO0lBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDOUIsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29yZHdpc2VfZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIG9wbmUgd2Vic2l0ZSBhcyBzb29uIGFzIHRoZSB1c2VyIGluc3RhbGxzIHRoZSBleHRlc2lvbiBcclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKHsgcmVhc29uIH0pID0+IHtcclxuICAgIGlmIChyZWFzb24gPT09ICdpbnN0YWxsJykge1xyXG4gICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL3d3dy53b3Jkd2lzZS5mb28vXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBsb2NhbFN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZSBpbiBzZXJ2aWNlIHdvcmtlcnMuIFVzaW5nIGNocm9tZS5zdG9yYWdlLmxvY2FsIGluc3RlYWQuXHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICAgICAgd29yZHdpc2VSYW5kb21Xb3JkSW5kZXg6ICcwJyxcclxuICAgICAgICAgICAgd29yZHdpc2VBbGxXb3Jkc0xpc3Q6IFtdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmNocm9tZS5ydW50aW1lLm9uU3RhcnR1cC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICBjaHJvbWUuYWN0aW9uLm9wZW5Qb3B1cCgpO1xyXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==