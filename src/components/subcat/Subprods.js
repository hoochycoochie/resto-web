import React from "react";
import { Modal } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import SubprodViewList from "../../containers/resto/SubprodViewList";

const Subprods = ({ open, cancel, subcat }) => (
  <Modal
    open={open}
    closeOnEscape={open}
    closeOnDimmerClick={open}
    onClose={cancel}
    centered={false}
    size="fullscreen"
  >
    <Modal.Header
      style={{ textAlign: "center", fontSize: 14, color: colors.VIOLET }}
    >
      {subcat.name}
    </Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <SubprodViewList subcat={subcat} />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default Subprods;
