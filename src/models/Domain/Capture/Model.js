export default class Model {
	constructor({url, blob}) {
		this.url = url;
		this.blob = blob;
	}
	getBlob() {
		return this.blob;
	}
}
