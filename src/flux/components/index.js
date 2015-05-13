import InputURL from './InputURL';
import ResultImages from './ResultImages';

export default class _ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'imageDataURLs': []
        };
    }
    componentDidMount() {
        let { context } = this.props;
        context.store.renderingImages.onChange(() => {
            this.setState({
                'imageDataURLs': context.store.renderingImages.getImageDataURLs()
            })
        });
    }
    componentWillUnmount() {
        let { context } = this.props;
        context.store.renderingImages.removeAllChangeListeners();
    }
    render() {
        let { context } = this.props;
    	if (this.state.imageDataURLs.length) {
    		return <ResultImages context={context} />;
    	} else {
    		return <InputURL context={context} />;
    	}
    }
}