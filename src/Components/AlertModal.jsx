import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Alert(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "100%",
    p: "10px 25px",
    borderRadius: "9px",
    display: "inline",
  };
  //Accessing props
  const { show } = props;
  //Redux state
  const alert = useSelector((state) => state.alert);

  return (
    <>
      {alert.type === "success" ? (
        <Modal className="modal" style={style} size="sm" show={show} centered>
          <Modal.Title className="alert-modal-success">
            <div className="alert-modal">
              <img
                style={{
                  borderTopRightRadius: "9px",
                  borderTopLeftRadius: "9px",
                }}
                src="https://www.citypng.com/public/uploads/preview/-31622580498juykxr0rdz.png"
                alt="success"
              />
            </div>
            <div className="alert-modal">Success!</div>
          </Modal.Title>
          <Modal.Body className="alert-message">{alert.message}</Modal.Body>
        </Modal>
      ) : (
        <Modal className="modal" style={style} size="sm" show={show} centered>
          <Modal.Title className="alert-modal-error">
            <div className="alert-modal">
              <img
                style={{
                  borderTopRightRadius: "9px",
                  borderTopLeftRadius: "9px",
                }}
                src="https://static.vecteezy.com/system/resources/previews/017/178/056/original/red-cross-mark-on-transparent-background-free-png.png"
                alt="error"
              />
            </div>
            <div className="alert-modal">Error!</div>
          </Modal.Title>
          <Modal.Body className="alert-message">{alert.message}</Modal.Body>
        </Modal>
      )}
    </>
  );
}
