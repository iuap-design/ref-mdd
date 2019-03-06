import React, { Component } from 'react';
import Label from './label';
import text from './text';
import classnames from 'classnames';

export default class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      id: 'ueditor' + new Date().getTime()
    };
  }
  showEditor() {
    UE.dom.domUtils.setStyle(document.getElementById(this.state.id), 'display', '');
  }
  hideEditor() {
    UE.dom.domUtils.setStyle(document.getElementById(this.state.id), 'display', 'none');
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    window.UEDITOR_HOME_URL = '/ueditor/';
    cb.requireInner([
      '/ueditor/ueditor.config.js',
      '/ueditor/ueditor.all.js',
      '/ueditor/ueditor.parse.min.js'], () => {
        this.editor = UE.getEditor(this.state.id, { initialFrameHeight: 275 });
        this.editor.ready(() => {
          if (this.content) this.editor.setContent(this.content);
          this.editor.addListener('contentChange selectionchange', () => {
            let content = this.editor.getContent();
            this.content = content;
          });
          this.editor.addListener('blur', () => {
            if (this.props.setContent)
              this.props.setContent(this.content);
            if (this.props.model)
              this.props.model.setValue(this.content, true);
          });
          this.state.readOnly ? this.hideEditor() : this.showEditor();
        }, this);
      }, this);
  }
  componentDidUpdate() {
    if (this.editor && this.editor.body) {
      let content = this.editor.getContent();
      if (content != this.content)
        this.editor.setContent(this.content);
      this.state.readOnly ? this.hideEditor() : this.showEditor();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.content = nextProps.content;
  }
  baseControl() {
    let children = [];
    children.push(<script key='script' id={this.state.id} type="text/plain"></script>);
    if (this.state.readOnly)
      children.push(text(<div key='div' dangerouslySetInnerHTML={{ __html: this.content }}></div>));
    return <div className={classnames({ browse: this.state.readOnly })}>{children}</div>
  }
  getControl() {
    let control = (this.props.cShowCaption ? <Label control={this.baseControl()} title={this.props.cShowCaption} /> : this.baseControl());
    return control;
  }
  render() {
    this.content = this.state.value;
    if (cb.utils.isEmpty(this.content))
      this.content = '';
    const control = this.getControl();
    let style = this.state.visible ? {} : { display: 'none' };
    return (
      <div className='basic-input-editor' style={style}>
        {control}
      </div>
    );
  }
}
