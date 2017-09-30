import React ,{Component} from  'react'


class ToolBar extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let tools = this.props.tools;

        return (
            <ul className="muyu-tool-bar">
                {
                    tools.map(tool=>(
                        <li key={tool.name} className={tool.isSplit?'muyu-tool-bar-split-line':''} onClick={this.props.toolClick(tool)}>
                            <div className="muyu-tool-bar-wrapper">
                                    <img src={'./images/'+tool.img} alt=""/>
                                    <div className='muyu-tool-bar-name'>
                                        {tool.name}
                                    </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        )
    }
}


ToolBar.propTypes = {

};


export default ToolBar;

