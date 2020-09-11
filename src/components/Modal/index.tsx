import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  const {
    toggle,
    modal,
    cancel,
    confirm,
    children
  } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
           <div className="d-flex justify-content-center align-items-center flex-column">
            {children}
           </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center align-items-center">
          <Button color="primary" onClick={confirm}>Aceptar</Button>
         { cancel?<Button color="danger" onClick={toggle}>Cancelar</Button>:null}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;