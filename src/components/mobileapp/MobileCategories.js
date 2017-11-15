import React, {Component,PropTypes} from 'react';
import CustomScroll from '.././ui/CustomScroll';
export default class  Categories extends Component
                                    {
render() {

 return (<CustomScroll>
        {
            this.props.categories.map((item, i) =>
            <div key={i} className="mobileItem">
                    <div className="categoryImage"><img src={item.src} width="40" height="40"/></div>
                    <div className="categoryText">
                        {item.name}
                    </div>
            </div>
            )
        }
        </CustomScroll>)

        }



                                    }