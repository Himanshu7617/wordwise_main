/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

// opne website as soon as the user installs the extesion 
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.tabs.create({
            url: "https://mini-project-sepia-nine.vercel.app/"
        });
        localStorage.setItem('wordwiseRandomWordIndex', '0');
        chrome.storage.local.set({ wordwiseAllWordsList: [] });
    }
});
chrome.runtime.onStartup.addListener(() => {
    chrome.action.openPopup();
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwREFBMEQ7QUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRyxFQUFFO0lBQ3BELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFO1lBQ2hCLEdBQUcsRUFBRyw2Q0FBNkM7U0FDdEQsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQyxvQkFBb0IsRUFBRyxFQUFFLEVBQUMsQ0FBQztJQUN6RCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFHSCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRSxFQUFFO0lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDOUIsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29yZHdpc2VfZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIG9wbmUgd2Vic2l0ZSBhcyBzb29uIGFzIHRoZSB1c2VyIGluc3RhbGxzIHRoZSBleHRlc2lvbiBcclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCB7IHJlYXNvbiB9ICkgPT4geyBcclxuICAgIGlmIChyZWFzb24gPT09ICdpbnN0YWxsJykgeyBcclxuICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoIHsgXHJcbiAgICAgICAgICAgIHVybCA6IFwiaHR0cHM6Ly9taW5pLXByb2plY3Qtc2VwaWEtbmluZS52ZXJjZWwuYXBwL1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmR3aXNlUmFuZG9tV29yZEluZGV4JywnMCcpO1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7d29yZHdpc2VBbGxXb3Jkc0xpc3QgOiBbXX0pXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmNocm9tZS5ydW50aW1lLm9uU3RhcnR1cC5hZGRMaXN0ZW5lcigoKT0+IHsgXHJcbiAgICBjaHJvbWUuYWN0aW9uLm9wZW5Qb3B1cCgpO1xyXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==