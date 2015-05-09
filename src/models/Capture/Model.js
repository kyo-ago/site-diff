export default class Model {
	constructor({url, blob}) {
		this.url = url;
		this.blob = blob;
	}
	getBlobURL() {
		return this.blob;
	}
}
