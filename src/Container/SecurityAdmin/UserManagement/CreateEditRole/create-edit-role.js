import React, { useState, useEffect } from "react";
import { Input, Typography, Space, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./custom-css.css";
import {
  saveUserBySecurityAdmin,
  rejectUserBySecurityAdmin,
  newRequestList,
  newRequestListCount,
  LOADER,
} from "../../../../store/actions/request-actions";
import {
  TextField,
  Table,
  Button,
  Modal,
  Notification,
  Loader,
} from "../../../../Components/Elements";
const CreateEditRoles = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const requestReducer = useSelector((state) => state.requestReducer);
  const ui = useSelector((state) => state.ui);
  const [showUrduContent, setShowUrduContent] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [rejectionComment, setRejectionComment] = useState("");
  var [rows, setRows] = useState([]);
  const [saveData, setSaveData] = useState([]);
  const [actions, setAction] = useState({
    add: false,
    edit: false,
    status: false,
    update: false,
  });
  let styleLoader = "authenticationLoaderStyle";
  const [userRequestDetails, setUserRequestDetails] = useState(
    requestReducer.UserRequestDetails
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, settitle] = useState();

  // for Approved user request modal
  const showAcceptModal = (data) => {
    console.log(data);
    setSaveData(data);
    settitle("Accept");
    setIsModalVisible(true);
    setAction({ ...actions, add: !actions.add });
  };
  // for notification
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  // for Reject user request modal
  const showRejectModal = (data) => {
    settitle("Reject");
    setAction({ ...actions, edit: !actions.add });
    setSaveData(data);
    setIsModalVisible(true);
    console.log(data);
  };
  // for create user
  const createUser = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    dispatch(saveUserBySecurityAdmin(saveData));
  };
  // for reject user request
  const rejectUser = async () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    dispatch(rejectUserBySecurityAdmin(saveData, rejectionComment));
    setRejectionComment("");
    setBtnDisabled(true);
  };
  // for Reject Comments
  const Comments = (e) => {
    setBtnDisabled(false);
    setRejectionComment(e.target.value);
    console.log(e.target.value);
  };
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };
  // for close modal
  const handleCancel = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    setRejectionComment("");
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "20%",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "15%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "15%",
    },
    {
      title: "Role",
      dataIndex: "roleID",
      key: "roleID",
      align: "center",
      render: (text) => (
        <>
          {text === 1 ? (
            <div>Security Administrator</div>
          ) : text === 2 ? (
            <div>System Administrator</div>
          ) : text === 3 ? (
            <div>Investigation Officer</div>
          ) : text === 4 ? (
            <div>Investigation Manager</div>
          ) : text === 5 ? (
            <div>QA Manager</div>
          ) : text === 6 ? (
            <div>MIS Manager</div>
          ) : (
            <div>Auditor</div>
          )}
        </>
      ),
      width: "15%",
    },
    {
      title: "Create User",
      dataIndex: "createuser",
      key: "createuser",
      align: "center",
      width: "15%",
      render: (text, row) => (
        <div
          onClick={() => showAcceptModal(row)}
          className="icon-add icon-size-one greenTick u-cursor-pointer"
        />
      ),
    },
    {
      title: "Delete User",
      dataIndex: "deleteuser",
      key: "deleteuser",
      align: "center",
      width: "15%",
      render: (text, row) => (
        <div
          onClick={() => showRejectModal(row)}
          className="icon-trash icon-size-one pdfRed u-cursor-pointer"
        />
      ),
    },
  ];
  // const buttonProps = {
  //   primaryButton: {
  //     text: "Yes",
  //     icon: <i className="icon-check icon-size-one"></i>,
  //     endIcon: "",
  //     class: "btnBorderStyledBeach",
  //     size: "",
  //     disable: "",
  //     click: () => null,
  //   },
  //   secondaryButton: {
  //     text: "Cancel",
  //     icon: <i className="icon-close icon-size-one"></i>,
  //     endIcon: "",
  //     class: "btnBorderStyledRed",
  //     size: "",
  //     disable: "",
  //     click: () => null,
  //   },
  // };
  console.log("requestReducerrequestReducer", requestReducer.Loading);
  useEffect(() => {
    setUserRequestDetails(requestReducer.UserRequestDetails);
    var addedKey, data;
    if (
      requestReducer.UserRequestDetails &&
      requestReducer.UserRequestDetails.length > 0
    ) {
      data = [...requestReducer.UserRequestDetails];

      addedKey = data.map((item, index) => {
        return { ...item, key: index };
      });
      setRows(addedKey);
    } else if (requestReducer.UserRequestDetails === null) {
      setRows([]);
    }

    console.log("inner data", requestReducer.UserRequestDetails);
  }, [requestReducer.UserRequestDetails]);
  useEffect(() => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserDetails.userID;
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      dispatch(LOADER());
      dispatch(newRequestListCount(userid));
      dispatch(newRequestList(userid));
    } else {
      dispatch(LOADER(true));
      dispatch(newRequestListCount(userid));
      dispatch(newRequestList(userid));
    }
  }, []);
  useEffect(() => {
    console.log("result", requestReducer.ResponseMessage);
    if (requestReducer.ResponseMessage === "Reject Successfully") {
      setOpen({
        ...open,
        open: true,
        message: "User request discarded",
      });
    }
    if (requestReducer.ResponseMessage === "Save Successfully") {
      setOpen({
        ...open,
        open: true,
        message: "Record saved",
      });
    }
  }, [requestReducer.ResponseMessage]);
  return (
    <>
      <Title className="CreateUserTitle" level={3}>
        Create User
      </Title>
      <Row gutter={8}>
        <div className="u-margin-top-10pct" />
        <Col md={24} lg={24} sm={24}>
          <Table
            rows={rows}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </Col>
      </Row>
      {console.log(actions.add)}
      {/* modal starts here */}
      <Modal
        modalTitle={
          <h3>
            <b>{title}</b>
          </h3>
        }
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
      >
        {" "}
        {actions.add && (
          <>
            <Title level={3} align="center">Are you sure you want to create a new user?</Title>
            <div className="u-padding-15px" />
            <Row gutter={8}>
              <Col md={6} lg={6} sm={24}></Col>
              <Col md={16} lg={16} sm={24}>
                <div className="u-display-flex">
                  <div className="u-width-33_333pct">
                    <Button
                      applyClass="buttonPrimary3"
                      text="Proceed"
                      icon={<i className="icon-check icon-size-one "></i>}
                      click={createUser}
                    />
                  </div>
                  <div className="u-margin-0-5px-0-5px" />
                  <div className="u-width-33_333pct">
                    <Button
                      applyClass="btnBorderStyledRed"
                      text="discard"
                      icon={<i className="icon-close icon-size-one"></i>}
                      click={handleCancel}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
        {actions.edit && (
          <>
            <div className="u-display-flex u-justify-content-center u-padding-40px">
              <p className="m-0 u-color-b27706">
                Type your Comments<span className="u-color-ce0000">*</span>
              </p>
              <TextField
                multiline
                rows={4}
                placeholder="Comments"
                change={Comments}
                value={rejectionComment}
                fullWidth
                name="Comments"
              />
            </div>
            <Row gutter={8}>
              <Col md={8} lg={8} sm={24}></Col>
              <Col md={16} lg={16} sm={24}>
                <div className="u-display-flex">
                  <div className="u-width-33_333pct">
                    <Button
                      applyClass="buttonPrimary3"
                      text="Proceed "
                      icon={<i className="icon-check icon-size-one "></i>}
                      click={rejectUser}
                      disableBtn={btnDisabled}
                    />
                  </div>
                  <div className="u-margin-0-5px-0-5px" />
                  <div className="u-width-33_333pct">
                    <Button
                      applyClass="btnBorderStyledRed"
                      text="discard "
                      icon={<i className="icon-close icon-size-one"></i>}
                      // click={() => goToSaveHandler(item, Rejected)}
                      click={handleCancel}
                      // disableBtn={btnDisabled}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {requestReducer.Loading ? <Loader loaderstyle={styleLoader} /> : null}
    </>
  );
};

export default CreateEditRoles;
