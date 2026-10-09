import React, { useState, useEffect } from "react";
import { Input, Typography, Space } from "antd";
import { Grid, Box, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styles from "./custom-css.css";
import MultiStep from "../../../../Components/Elements/MultiStep/multi-step";
import AddIcon from "@material-ui/icons/Add";
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
  const state = useSelector((state) => state);
  const { requestReducer, ui } = state;
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
          style={{ cursor: "pointer" }}
          onClick={() => showAcceptModal(row)}
          className="icon-add icon-size-one greenTick"
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
          style={{ cursor: "pointer" }}
          onClick={() => showRejectModal(row)}
          className="icon-trash icon-size-one pdfRed"
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
      <Grid container spacing={1}>
        <div style={{ marginTop: "10%" }} />
        <Grid item md={12} lg={12} sm={12}>
          <Table
            rows={rows}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </Grid>
      </Grid>
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
            <div style={{ padding: "15px" }} />
            <Grid container spacing={1}>
              <Grid item md={3} lg={3} sm={12}></Grid>
              <Grid item md={8} lg={8} sm={12}>
                <Box display="flex">
                  <Box width={2 / 6}>
                    <Button
                      applyClass="buttonPrimary3"
                      text="Proceed"
                      icon={<i className="icon-check icon-size-one "></i>}
                      click={createUser}
                    />
                  </Box>
                  <div style={{ margin: "0 5px 0 5px" }} />
                  <Box width={2 / 6}>
                    <Button
                      applyClass="btnBorderStyledRed"
                      text="discard"
                      icon={<i className="icon-close icon-size-one"></i>}
                      click={handleCancel}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
        {actions.edit && (
          <>
            <Box
              display="flex"
              justifyContent="center"
              style={{ padding: "40px" }}
            >
              <p className="m-0" style={{ color: "#b27706" }}>
                Type your Comments<span style={{ color: "#ce0000" }}>*</span>
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
            </Box>
            <Grid container spacing={1}>
              <Grid item md={4} lg={4} sm={12}></Grid>
              <Grid item md={8} lg={8} sm={12}>
                <Box display="flex">
                  <Box width={2 / 6}>
                    <Button
                      applyClass="buttonPrimary3"
                      text="Proceed "
                      icon={<i className="icon-check icon-size-one "></i>}
                      click={rejectUser}
                      disableBtn={btnDisabled}
                    />
                  </Box>
                  <div style={{ margin: "0 5px 0 5px" }} />
                  <Box width={2 / 6}>
                    <Button
                      applyClass="btnBorderStyledRed"
                      text="discard "
                      icon={<i className="icon-close icon-size-one"></i>}
                      // click={() => goToSaveHandler(item, Rejected)}
                      click={handleCancel}
                      // disableBtn={btnDisabled}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {requestReducer.Loading ? <Loader loaderstyle={styleLoader} /> : null}
    </>
  );
};

export default CreateEditRoles;
