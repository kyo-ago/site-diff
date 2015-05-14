import React from 'react';
export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.resultStore = this.props.context.store.result;
        this.state = {
            data: this.resultStore.getData()
        };
    }

    _onChange() {
        this.setState({
            data: this.resultStore.getUserData()
        });
    }

    componentDidMount() {
        this.resultStore.onChange(this._onChange.bind(this));

        var { context } = this.props;
        context.actions.result({
            'type': 'onLoad'
        });
    }

    componentWillUnmount() {
        this.resultStore.removeAllChangeListeners();
    }

    render() {
        console.log(this.state.data);
        return (
            <div>
                userData: {this.state.data}
            </div>
        );
}
}