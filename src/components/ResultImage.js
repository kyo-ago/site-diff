export default class _ extends React.Component {
	render() {
		return (
			<img src={this.props.src} />
		);
	}
}
_.propTypes = {
	'src': React.PropTypes.string.isRequired
};