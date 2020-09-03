import React ,{MouseEvent} from 'react'
import Stepper from 'react-stepper-horizontal';
import {withRouter} from 'react-router'
import {IPropsStepper} from './interface'
const StepperCostum = (props:IPropsStepper) => {
    const steps= [{
        title: 'Estacion',
        onClick: (e:MouseEvent) => {
          e.preventDefault()
          props.history.push('/station')
        }
      }, {
        title: 'Tanques',
        onClick: (e:MouseEvent) => {
          e.preventDefault()
          props.history.push('/tank')
        }
      }, {
        title: 'Isla',
        onClick: (e:MouseEvent) => {
          e.preventDefault()
          props.history.push('/island')
        }
      }, {
        title: 'Surtidores',
        onClick: (e:MouseEvent) => {
          e.preventDefault()
          props.history.push('/pump')
        }
      },
      {
        title: 'Mangueras',
        onClick: (e:MouseEvent) => {
          e.preventDefault()
          props.history.push('/hose')
        }
      }
    ]
    return (
        <div className="mb-4">
            <Stepper steps={ steps } completeBarColor="#ffc107"  activeColor={'#033246'} completeColor={'#ffc107'}  circleFontSize={14} lineMarginOffset={20} activeStep={ props.current} />
        </div>
    )
}

export default  withRouter(StepperCostum);
