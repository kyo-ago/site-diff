import React from 'react';
import Result from './components/Result';
import Urls from './components/Urls';

export default class ResultComponent extends React.Component {
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