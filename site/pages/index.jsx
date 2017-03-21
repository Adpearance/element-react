import React from 'react';
import classnames from 'classnames';

import Install from './install';
import QuickStart from './quick-start';
import i18n from './i18n';
import CustomTheme from './custom-theme';

import Alert from './alert';
import Layout from './layout';
import Button from './button';
import Radio from './radio';
import Card from './card';
import Message from './message';
import MessageBox from './message-box';
import Notification from './notification';
import Loading from './loading';
import Progress from './progress';
import Badge from './badge';
import Tree from './tree';
import Rate from './rate';
import Tooltip from './tooltip';
import Input from './input';
import Icon from './icon';
import Menu from './menu';
import Steps from './steps';
import Typography from './typography';
import Color from './color';
import Breadcrumb from './breadcrumb';
import InputNumber from './input-number';
import Checkbox from './checkbox';
import Slider from './slider';
import Table from './table';
import Switch from './switch';
import TimePicker from './time-picker';
import DatePicker from './date-picker';
import Upload from './upload';
import Dialog from './dialog';
import Tabs from './tabs';
import Tag from './tag';
import Select from './select';
import Dropdown from './dropdown';
import Popover from './popover';
import Form from './form';
import Pagination from './pagination';
import Carousel from './carousel';
import Collapse from './collapse';
import ColorPicker from './color-picker';
import Cascader from './cascader';

// pages是有序的Object, 会影响到左侧的菜单顺序.
const pages = {
  documents: {
    'install': { title: '安装', component: Install },
    'quick-start': { title: '快速上手', component: QuickStart },
    'i18n': { title: '国际化', component: i18n },
    'custom-theme': { title: '自定义主题', component: CustomTheme }
  },
  components: {
    'Basic': {
      'layout': { title: 'Layout 布局', component: Layout },
      'color': { title: 'Color 色彩', component: Color },
      'typography': { title: 'Typography 字体', component: Typography },
      'icon': { title: 'Icon 图标', component: Icon },
      'button': { title: 'Button 按钮', component: Button },
    },
    'Form': {
      'radio': { title: 'Radio 单选框', component: Radio },
      'checkbox': { title: 'Checkbox 多选框', component: Checkbox },
      'input': { title: 'Input 输入框', component: Input },
      'input-number': { title: 'Input Number 计数器', component: InputNumber },
      'select': { title: 'Select 选择器', component: Select },
      'cascader': { title: 'Cascader 级联选择器', component: Cascader },
      'switch': { title: 'Switch 开关', component: Switch },
      'slider': { title: 'Slider 滑块', component: Slider },
      'time-picker': { title: 'Time Picker 时间选择器', component: TimePicker },
      'date-picker': { title: 'Date Picker 日期选择器', component: DatePicker },
      'upload': { title: 'Upload 上传', component: Upload },
      'rate': { title: 'Rate 评分', component: Rate },
      'color-picker': { title: 'ColorPicker 颜色选择器', component: ColorPicker },
      'form': { title: 'Form 表单', component: Form },
    },
    'Data': {
      'table': { title: 'Table 表格组件', component: Table },
      'tag': { title: 'Tag 标签', component: Tag },
      'progress': { title: 'Progress 进度条', component: Progress },
      'tree': { title: 'Tree 树形控件', component: Tree },
      'pagination': { title: 'Pagination 分页', component: Pagination},
      'badge': { title: 'Badge 标记', component: Badge },
    },
    'Notice': {
      'alert': { title: 'Alert 警告', component: Alert },
      'loading': { title: 'Loading 加载', component: Loading },
      'message': { title: 'Message 消息提示', component: Message },
      'message-box': { title: 'Message Box 弹框', component: MessageBox },
      'notification': { title: 'Notification 通知', component: Notification },
    },
    'Nav': {
      'menu': { title: 'NavMenu 导航菜单', component: Menu },
      'tabs': { title: 'Tabs 标签页', component: Tabs },
      'breadcrumb': { title: 'Breadcrumb 面包屑', component: Breadcrumb },
      'dropdown': { title: 'Dropdown 下拉菜单', component: Dropdown },
      'steps': { title: 'Steps 步骤', component: Steps },
    },
    'Others': {
      'dialog': { title: 'Dialog 对话框', component: Dialog },
      'tooltip': { title: 'Tooltip 文字提示', component: Tooltip },
      'popover': { title: 'Popover 弹出框', component: Popover },
      'card': { title: 'Card 卡片', component: Card },
      'carousel': { title: 'Carousel 走马灯', component: Carousel },
      'collapse': { title: 'Collapse 折叠面板', component: Collapse }
    }
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    window.addEventListener("hashchange", () => {
      window.scrollTo(0, 0);

      this.setPage();
    }, false);
  }

  componentDidMount() {
    this.setPage(() => {
      if (!this.state.locale) {
        this.setLocale('zh-CN');
      }
    });
  }

  setLocale(locale) {
    localStorage.setItem('ELEMENT_LANGUAGE', locale);
    window.location.hash = `/${locale}/${this.state.page}`;
  }

  getPage() {
    const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);

    if (routes) {
      this.state.locale = routes[1];

      return routes[2];
    }

    return 'layout';
  }

  setPage(fn) {
    this.setState({ page: this.getPage() }, fn);
  }

  getComponent(page) {
    this.components = this.components || Object.assign(Object.values(pages.components).reduce((a, b) => {
      return Object.assign(a, b);
    }, {}), pages.documents);

    const result = this.components[page];

    if (result) {
      return React.createElement(result.component);
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <h1>
              <img src={require('../assets/logo.svg')} />
            </h1>
            <ul className="nav">
              <li className="nav-item">
                <a href="http://element.eleme.io/#/zh-CN/guide/design">指南</a>
              </li>
              <li className="nav-item">
                <a className="active">组件</a>
              </li>
              <li className="nav-item">
                <a href="http://element.eleme.io/#/zh-CN/resource">资源</a>
              </li>
              <li className="nav-item">
                <span className={classnames('nav-lang', { active: this.state.locale === 'zh-CN'})} onClick={this.setLocale.bind(this, 'zh-CN')}>中文</span>
                <span> / </span>
                <span className={classnames('nav-lang', { active: this.state.locale === 'en-US'})} onClick={this.setLocale.bind(this, 'en-US')}>En</span>
              </li>
            </ul>
          </div>
        </header>
        <div className="main container">
          <nav className="side-nav">
            <ul>
              <li className="nav-item">
                <a>开发指南</a>
                <ul className="pure-menu-list sub-nav">
                  {
                    Object.keys(pages.documents).map(page => {
                      return (
                        <li className="nav-item" key={page}>
                          <a href={`/#/${this.state.locale}/${page}`} className={page === this.state.page ? 'active' : ''}>{pages.documents[page].title}</a>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
              <li className="nav-item">
                <a>基础组件</a>
                {
                  Object.keys(pages.components).map(group => {
                    return (
                      <div className="nav-group" key={group}>
                        <div className="nav-group__title">{group}</div>
                        <ul className="pure-menu-list">
                          {
                            Object.keys(pages.components[group]).map(page => {
                              return (
                                <li key={page} className="nav-item">
                                  <a href={`/#/${this.state.locale}/${page}`} className={page === this.state.page ? 'active' : ''}>{pages.components[group][page].title}</a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  })
                }
              </li>
            </ul>
          </nav>
          <div className="content">{ this.getComponent(this.state.page) }</div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="footer-main">
              <p className="footer-main-title">Element-React</p>
              <a href="https://github.com/eleme/element-react/issues" target="_blank" rel="noopener noreferrer" className="footer-main-link">反馈建议</a>
              <a href="https://github.com/eleme/element-react/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="footer-main-link">贡献指南</a>
            </div>
            <div className="footer-social">
              <a href="//github.com/eleme/element-react" target="_blank" rel="noopener noreferrer">
                <img src={require('../assets/github.png')} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}