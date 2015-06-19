import React from 'react';

export default class Urls extends React.Component {
    constructor(props) {
        super(props);
        this.renderStore = this.props.context.store.render;
        this.state = {
            param: this.renderStore.getParam()
        };
    }

    _onChange() {
        this.setState({
            param: this.renderStore.getParam()
        });
    }

    componentDidMount() {
        this.renderStore.onChange(this._onChange.bind(this));
    }

    componentWillUnmount() {
        this.renderStore.removeAllChangeListeners();
    }

    onClick(url) {
        console.log(url);
    }

    render() {
        let urls = Object.keys(this.state.param.allUrls || {}).map((url) => <li key={url}><a onClick={this.onClick.bind(this, url)} href="#">{url}</a></li>);
        return (
            <div className="UrlList">
                <ul>
                    {urls}
                </ul>
            </div>
        );
    }
}