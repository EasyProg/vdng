import React, {Component,PropTypes} from 'react';
export default class MobileApp extends Component  {
    constructor(props)                            {
        super(props);
        this.state =                              {
                itemChosen:0
                                                  }
                                                  }
  render ()                                       {
      return                                      (
        <div className="mobileMenuContainer">
            <div className="mobileMenuHeader">
                <div>Categories</div>
                <div>All channels</div>
                <div>Tv program</div>
            </div>
        </div>

                                                   )
                                                   }


                                                   }