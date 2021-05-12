export const set = (key, data) => {
  const object = {};
  object[key] = data;
  chrome.storage.sync.set(object);
}

export const get = (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (items) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        
        if (items[key]) {
            return resolve(items[key]);
        } else {
            return resolve([]);
        }
      });
    });
} 
