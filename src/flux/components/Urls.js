import React from 'react';

export default class Urls extends React.Component {
    constructor(props) {
        super(props);
        this.renderStore = this.props.context.store.render;
        this.state = {
            urls: this.renderStore.getUrls()
        };
    }

    _onChange() {
        this.setState({
            urls: this.renderStore.getUrls()
        });
    }

    componentDidMount() {
        this.renderStore.onChange(this._onChange.bind(this));
    }

    componentWillUnmount() {
        this.renderStore.removeAllChangeListeners();
    }

    render() {
        let urls = Object.keys(this.state.urls).map((url) => <li>{url}</li>);
        return (
            <div className="UrlList">
                <ul>
                    {urls}
                </ul>
            </div>
        );
    }
}