import resemble from 'resemblejs';

export default class _ {
	constructor({url, imageDataURI}) {
		this.url = url;
		this.imageDataURI = imageDataURI;
	}
	getImageDataURI() {
		return this.imageDataURI;
	}
	diff(capture) {
		const bef = capture.getImageDataURI();
		const aft = this.imageDataURI
		return new Promise((resolve) => resemble(bef).compareTo(aft).onComplete(resolve))
	}
}
