import Model from './Model';

export default class _ {
	constructor() {
		this.storageKey = 'capture-';
	} 
	get(url) {
		return new Promise((resolve, reject) => {
			const key = this.storageKey + url;
		    chrome.storage.local.get(key, (result) => {
				if (chrome.runtime.lastError) {
					return reject(chrome.runtime.lastError.message);
				}
				const data = result[key];
				if (!data) {
			    	return resolve(monapt.None);
				}
				const capture = new Model({
					'url': data['url'],
					'blob': data['blob'],
				});
		    	resolve(monapt.Option(capture));
		    });
		});
	}
	save(capture) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.set({
				[this.storageKey + capture['url']]: {
					'url': capture['url'],
					'blob': capture['blob'],
				}
			}, () => {
				if (chrome.runtime.lastError) {
					return reject(chrome.runtime.lastError.message);
				}
				resolve();
			});
		});
	}
}
