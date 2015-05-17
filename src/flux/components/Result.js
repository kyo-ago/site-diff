import React from 'react';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.renderStore = this.props.context.store.render;
        this.state = {
            data: this.renderStore.getData()
        };
    }

    _onChange() {
        this.setState({
            data: this.renderStore.getData()
        });
    }

    componentDidMount() {
        this.renderStore.onChange(this._onChange.bind(this));

        var { context } = this.props;
        context.actions.result({
            'type': 'onLoad'
        });
    }

    componentWillUnmount() {
        this.renderStore.removeAllChangeListeners();
    }

    render() {
        let items = this.state.data.map(({blobURL}) => <img src={blobURL} />);
        return (
            <div>
                {items}
            </div>
        );
}
}