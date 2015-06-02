import React from 'react';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.renderStore = this.props.context.store.render;
        this.state = {
            models: this.renderStore.getModels(),
            urls: this.renderStore.getUrls()
        };
    }

    _onChange() {
        this.setState({
            models: this.renderStore.getModels(),
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
        let items = this.state.models.map(({fileUrl}) => <img src={fileUrl} />);
        return (
            <div className="ResultCapture">
                {items}
            </div>
        );
    }
}