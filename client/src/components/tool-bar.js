import React ,{Component} from  'react'
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

class ToolBar extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let config = this.props.config;
        let rightTool = config.rightTools;

        return (
            <div className="my-tb">
                <div className="my-tb-left">

                </div>
                <div className="my-tb-right">
                    <ButtonGroup>
                        {
                            rightTool.items.map(btn=>(
                                <Button icon={btn.icon} key={btn.name}>{btn.name}</Button>
                            ))
                        }
                    </ButtonGroup>
                </div>
            </div>

        )
    }
}


ToolBar.propTypes = {

};


export default ToolBar;

