import Loading from './Loading';
import ResultImage from './ResultImage';

export default class _ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'src': undefined
        };
    }
    componentDidMount() {
        let { context } = this.props;
        context.store.firstCapture.onChange(() => {
            this.setState({
                'src': context.store.firstCapture.getSrc()
            })
        });
        context.store.diffCapture.onChange(() => {
            this.setState({
                'src': context.store.diffCapture.getSrc()
            })
        });
    }
    componentWillUnmount() {
        let { context } = this.props;
        context.store.firstCapture.removeAllChangeListeners();
        context.store.diffCapture.removeAllChangeListeners();
    }
    render() {
    	if (this.state.src) {
    		return <ResultImage src={this.state.src} />;
    	} else {
    		return <Loading context={this.props.context} />;
    	}
    }
}