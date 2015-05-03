export default class _ extends React.Component {
    constructor(props) {
        super(props);
    }
    doLoad(urls) {
        let urlObjs = urls.split('\n').map((url) => new URL(url));
        if (!urlObjs.length) {
            return;
        }
        this.props.context.actions.doLoadURLs(urlObjs);
    }
    onChange() {
        let urls = this.refs.urls.getDOMNode().value;
        if (!urls.trim()) {
            return;
        }
        this.doLoad(urls);
    }
    componentDidMount() {
        this.refs.urls.getDOMNode().focus();
    }
    render() {
        return (
            <div>
                <textarea autofocus ref="urls" onKeyUp={ this.onChange.bind(this) } onPaste={ this.onChange.bind(this) }></textarea>
            </div>
        );
    }
}
