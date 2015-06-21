import React from 'react';
import ResultPage from './pages/Result';

export default class Main extends React.Component {
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

        var { context } = this.props;
        context.actions.result({
            'type': 'onLoad'
        });
    }

    componentWillUnmount() {
        this.renderStore.removeAllChangeListeners();
    }

    render() {
        var { context } = this.props;
        var param = this.state.param || {};
        if (!param.page || param.page === 'result') {
            return (
                <ResultPage context={context} />
            );
        }
    }
}