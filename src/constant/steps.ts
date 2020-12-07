import { createHashHistory } from 'history'
export const history = createHashHistory();
export const stepsCreate = [{
    title: 'Estacion',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/create/station')
    }
  },{
    title: 'Dispositivos',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/create/device')
    }
  }
  , {
    title: 'Tanques',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/create/tank')
    }
  }, {
    title: 'Isla',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/create/island')
    }
  }, {
    title: 'Surtidores',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/create/pump')
    }
  },
  {
    title: 'Mangueras',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/create/hose')
    }
  }]

  export const stepsEdit = [
  {
    title: 'Dispositivos',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/edit/device')
    }
  },
   {
    title: 'Surtidores',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/edit/pump')
    }
  },
  {
    title: 'Mangueras',
    onClick: (e:MouseEvent) => {
      e.preventDefault()
      history.push('/edit/hose')
    }
  }]