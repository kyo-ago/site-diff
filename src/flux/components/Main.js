import React from 'react';
import Result from './Result';
import Urls from './Urls';

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
        return (
            <div>
                <div>
                    <Urls context={context} />
                </div>
                <div>
                    <Result context={context} />
                </div>
            </div>
        );
    }
}