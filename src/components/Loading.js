export default class _ extends React.Component {
    componentDidMount() {
        this.props.context.actions.doLoad();
    }
    render() {
        return (
            <div>loading...</div>
        );
    }
}