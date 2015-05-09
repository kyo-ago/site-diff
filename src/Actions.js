import {Action} from 'material-flux';

export const keys = {
    'doLoadURLs': 'doLoadURLs',
    'renderingImages': 'renderingImages'
};
export default class _ extends Action {
    constructor(context) {
        super(context);
    }
    doLoadURLs(urls) {
        chrome.runtime.sendMessage({type: 'doCaptures', urls});
    }
}