//get all the words that are needed to be changed

type newWord = { 
  word: string, 
  definition : string,
}

// alert("from content script");
const allWords : newWord[] = [];
chrome.storage.local.get(['wordwiseAllWordsList'], (res) => { 
  const tempList = res.wordwiseAllWordsList || [];

  if(tempList.length > 0) { 
    tempList.forEach((item : newWord) => { 
      allWords.push(item)
    })
  }
  
})


// process nodes and change the word
function handleProcessNodeEvent(node: HTMLElement | ChildNode) {
  if (node.childNodes.length > 0) {
    Array.from(node.childNodes).forEach(handleProcessNodeEvent);
  }

  if (node instanceof HTMLElement) {
    handleChangeWordEvent(node);
  }
}

function handleChangeWordEvent(node: Node) {
  
    

    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent || "";
      allWords.forEach((item : newWord) => {
        if (text.includes(item.word)) {
          text = text.replaceAll(item.word, item.definition);
        }
      });
      node.textContent = text;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach((child) => handleChangeWordEvent(child));
    }
   
  
}

//observing changes in the dom

const callback = (
  mutationList: MutationRecord[],
  obeserver: MutationObserver
): void => {
  mutationList.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          handleProcessNodeEvent(node);
        }
      });
    } else {
      if (mutation.target instanceof HTMLElement) {
        handleProcessNodeEvent(mutation.target);
      }
    }
  });
};

const observer = new MutationObserver(callback);
const config = {
  attributes: true,
  childList: true,
  subtree: true,
};


// chrome.storage.sync.get('wordwiseUserEmail', (email) => { 
//   if(email.length > 0){ 
//     observer.observe(document, config);
//   }
// })

observer.observe(document, config);
