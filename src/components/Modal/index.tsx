import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss'

interface IProps {
  title: string;
  onOk?: any;
  onCancel?: () => void;
}

const Modal = ({ title, onOk, onCancel }: IProps) => {
  return ReactDOM.createPortal( 
      <div className="modal-wrapper">
        <div className="modal-dialog modal-dialog-centered .modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">
              <p>{title}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onCancel}>Закрыть</button>
              <button type="button" className="btn btn-primary" onClick={onOk}>Да</button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('root') as HTMLElement
  )
}

export default Modal;