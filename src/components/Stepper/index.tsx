import React  from 'react'
import Stepper from 'react-stepper-horizontal';
import {withRouter} from 'react-router'
import {IPropsStepper} from './interface'
const StepperCostum = (props:IPropsStepper) => {
    const steps=  props.steps 
    return (
        <div className="mb-4">
            <Stepper steps={ steps } completeBarColor="#ffc107"  activeColor={'#033246'} completeColor={'#ffc107'}  circleFontSize={14} lineMarginOffset={20} activeStep={ props.current} />
        </div>
    )
}

export default  withRouter(StepperCostum);
