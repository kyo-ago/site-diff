import React from 'react';

export default class Result extends React.Component {
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

    render() {
        let items = (this.state.param.allModels || []).map(({fileUrl}) => <img key={fileUrl} src={fileUrl} />);
        return (
            <div className="ResultCapture">
                {items}
            </div>
        );
    }
}