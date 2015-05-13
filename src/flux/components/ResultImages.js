export default class _ extends React.Component {
    render() {
        let { context } = this.props;
        let imageDataURLs = context.store.renderingImages.getImageDataURLs();
        let images = imageDataURLs.map((url) => <img src={this.props.context} />);
        return (
            <div>{images}</div>
        );
    }
}
_.propTypes = {
    'context': React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};