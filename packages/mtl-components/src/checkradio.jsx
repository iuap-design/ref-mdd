import React from 'react';

export default class CheckRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bIsNull: props.bIsNull,
            value: props.checked || false,
            defaultChecked: false,
            focus: props.focus,
            visible: !props.bHidden,
            readOnly: props.readOnly,
            style: {},
            className: props.className || ''
        }
    }
    componentDidMount() {
        if (this.props.model)
            this.props.model.addListener(this);
    }
    componentDidUpdate() {
        if (this.props.model)
            this.props.model.addListener(this);
    }
    componentWillUnmount() {
        if (this.props.model)
            this.props.model.removeListener(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.model) {
            if (!this.props.model) {
                nextProps.model.addListener(this);
            } else {
                return;
            }
        } else {
            let checked = false;
            if (this.props.model) {
                this.props.model.removeListener(this);
                if (this.props.checked)
                    this.setState({
                        value: this.props.checked
                    });
            } else {
                this.setState({
                    value: nextProps.checked
                });
            }
        }
        this.setState({
            readOnly: nextProps.readOnly,
            focus: nextProps.focus,
            className: nextProps.className
        });
    }
    onChange = (e) => {
        if (this.state.readOnly) return;
        if (this.props.model) {
            let value = this.props.model.getValue();
            this.props.model.setValue(!value, true);
        } else {
            if (this.props.onChange)
                this.props.onChange(!this.state.value);
        }
    }
    handleBodyClick = (e) => {
        if (this.contains(this.refs.div, e.target)) return;
        document.body.removeEventListener('click', this.handleBodyClick);
        this.setState({
            focus: false
        });
        if (this.props.model)
            this.props.model.execute('blur');
    }
    contains = (elem, target) => {
        if (elem === target)
            return true;
        if (!elem || !elem.children.length)
            return false;
        for (var i = 0, len = elem.children.length; i < len; i++) {
            if (this.contains(elem.children[i], target))
                return true;
        }
        return false;
    }
    setVisible = (value) => {
        this.setState({
            visible: value
        })
    }
    baseControl = () => {
        const value = this.state.value;
        let control;
        if (this.state.readOnly) {
            if (!value)
                control = <div className="checkradio-unchecked-readonly"></div>
            else
                control = <div className="checkradio-checked-readonly"></div>
        } else {
            if (!value)
                control = <div className="checkradio-unchecked" onClick={this.onChange}></div>
            else
                control = <div className="checkradio-checked" onClick={this.onChange}></div>
        }
        return <div ref="div" className="checkradio-container">{control}</div>

    }
    render() {
        let control = this.baseControl();
        let classname = this.state.className;
        let style = this.state.visible ? {} : { display: "none" };
        if (this.state.focus)
            document.body.addEventListener('click', this.handleBodyClick);
        return (
            <div className={classname} style={style}>{control}</div>
        );
    }
}
