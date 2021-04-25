export const setFilterLists = (filterLists) => {    
    chrome.storage.sync.set({'filterLists': filterLists});
}

export const getFilterLists = () => {
    // Immediately return a promise and start asynchronous work
    return new Promise((resolve, reject) => {
      // Asynchronously fetch all data from storage.sync.
      chrome.storage.sync.get(null, (items) => {
        // Pass any observed errors down the promise chain.
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        
        if (items.filterLists) {
            return resolve(items.filterLists);
        } else {
            return resolve([]);
        }
      });
    });
} 
