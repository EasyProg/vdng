import React, {Component,PropTypes} from 'react';
import CustomScroll from '.././ui/CustomScroll';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleCategory,getChannels} from '../../actions/actions';
class  MobileCategories extends Component
                                                        {
    constructor(props)                                  {
        super(props);
        this.chooseItem=this.chooseItem.bind(this);
        this.filterChannels = this.filterChannels.bind(this);
        this.state =                                    {
            itemChosen:0
                                                        };}
    chooseItem(index,cat)                               {
    this.setState({itemChosen:index});
    var filtered = this.filterChannels(this.props.channels,cat);
    this.props.dispatch(getChannels(filtered));
                                                        }
    filterChannels(channels,category)                   {
        var cat = category?category.toString():'All channels';
        let filteredChannels = [];
        if  (channels)                                  {
        filteredChannels =  channels.filter(function(item)
                                                        {
        if (cat !==  'Все жанры'&&cat !=='Locked'&&cat!=='undefined'&&cat!=='Любимые')
        return       item.category.toUpperCase() === cat.toUpperCase();
        else if      (cat ==='Любимые') return item.channelId && localStorage.getItem(item.channelId);
        else return  item.category
                                                        })
                                                        }
        this.props.dispatch(getChannels(filteredChannels));
        return filteredChannels;
                                                        };
    render()                                            {
    return (<CustomScroll>
            {
            this.props.categories.map
            ((item, i) =>
            <div key={i} className={i===this.state.itemChosen?"mobileItemAct":"mobileItem"}//"mobileItem"
            onClick={(e)=>this.chooseItem(i,item.name)}
            >
                    <div className="categoryImage">
                    <img src={item.src} width="40" height="40"/></div>
                    <div className="categoryText">
                        {item.name}
                    </div>
            </div>
            )
            }
            </CustomScroll>)

                                                        }
                                                        }


const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
            dispatch,getChannels,toggleCategory
                       },dispatch);
export default connect(
    state =>
        ({  channels:state.channelReducer.channels,
            channelCategory:state.channelReducer.chosenCategory,
            isFavor:state.channelReducer.isFavor
        }),
    mapDispatchToProps
)(MobileCategories);