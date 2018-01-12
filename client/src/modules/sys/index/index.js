import React from 'react'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import {Row,Col,Icon}  from 'antd'
import Color from 'color'
import {bindActionCreators} from 'redux'
import {tabAdd} from '../../../redux/actions/tabs'

 class IndexContainer extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this,{tabAdd} = this.props;
        $t.moduleName  = 'sysIndex';
        $t.titlePrefix = "主页";
        $t.state.taskList = [];
        $t.state.taskNum = 0;
        $t.state.notifyList =[];
        $t.state.notifyNum = 0;
        $t.pageSize = 15;

        $t.regEvent("didMount",()=>{
            $t.getData();
            setInterval(()=>{
                $t.getData();
            },10000);
        });

        $t.getData =()=>{
            $t.u.get($t.getBaseUrl('area/findPage?pageNum=0&pageSize='+$t.pageSize),bean=>$t.setState({taskList:bean.list,taskNum:bean.total}));
            $t.u.get($t.getBaseUrl('notify/findPage?pageNum=0&pageSize='+$t.pageSize),bean=>$t.setState({notifyList:bean.list,notifyNum:bean.total}));
        };

        $t.openLink = (name,href)=>tabAdd({href,name});
    }

    render() {
        return (
            <div className="my-col-full my-wrapper" >
                <div className="my-index-ws">
                    <Row>
                        <Icon type="rocket" />
                        统计指标
                    </Row>
                    <hr/>
                    <Row>
                        <Col span={6}><CountComponent icon="user" name={'在线人数'} background="#006699" href="/onlineCount"/></Col>
                        <Col span={6}><CountComponent icon="picture" name={'在线人数'} background="#660033"/></Col>
                        <Col span={6}><CountComponent icon="star" name={'在线人数'} background="#FF0066"/></Col>
                        <Col span={6}><CountComponent icon="line-chart" name={'在线人数'} background="#FF33FF"/></Col>
                    </Row>
                </div>
                <div className="my-index-ws">
                    <Row>
                        <Col span={12}>
                                <Icon type="team" />
                                <a href="#" >代办任务&nbsp;(Top{this.pageSize})</a>
                        </Col>
                        <Col span={12}>
                            <Icon type="tag" />
                            <a href="#" >通知/公告&nbsp;(Top{this.pageSize})</a>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>

                        <Col span={12}>
                            <ul>
                                {this.state.taskList.map(task=>(
                                    <li key={task.id}>
                                        <div className="my-task">
                                            <a href="">{'['+task.name+'] '+"迪拜计划耗资10亿美元建世界最高塔"}</a>
                                            <span>{task.createDate}</span>
                                        </div>
                                        <hr/>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col span={12}>
                            <ul>
                                {this.state.notifyList.map(notify=>(
                                    <li key={notify.id}>
                                        <div className="my-task">
                                            <a href="#" onClick={()=>this.props.tabAdd({href:'/sys/notify/reading',name:'通知查看',data:notify})}>
                                                {'['+this.u.getDict('sys_notify_type',notify.type)+'] '+notify.title}
                                            </a>
                                            <span>{notify.createDate}</span>
                                        </div>
                                        <hr/>
                                    </li>
                                ))}

                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


export default connect(state=>({}),dispatch=>({tabAdd:bindActionCreators(tabAdd,dispatch),}))(IndexContainer);

class CountComponent extends BaseComponent{

    constructor(props){
        super(props);
        this.state.count = parseInt(Math.random(0,1)*1000);

        this.regEvent("didMount",()=>{
            if(this.props.href){
                this.getCount();
                setInterval(()=>{
                    this.getCount();
                },10000);
            }
        });

        this.getCount = ()=>{
            this.u.get('/api'+this.props.href,(bean)=>{
                this.setState({count:bean.data});
            })
        }
    }

    render(){
        let color  = this.props.background||'#CC0099';
        let darken = Color(color).darken(0.1);

        return (
            <div className='my-index-count' style={{background:color}}>
                <div className="my-count-header">
                    <div className="flex flex-between-row">
                        <Icon type={this.props.icon || "pie-chart"} />
                        <div>
                            <div style={{'fontSize':'24px','textAlign':'right'}}>{this.state.count}</div>
                            <div>{this.props.name}</div>
                        </div>
                    </div>
                </div>
                <div className="my-count-footer" style={{background:darken}}>
                    <div className="flex flex-between-row">
                        <span>查看更多</span>
                        <div className="my-more">
                            <Icon type="arrow-right" style={{color:color}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}