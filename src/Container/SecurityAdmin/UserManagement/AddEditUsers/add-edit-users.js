import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { UndoOutlined as Restore } from "@ant-design/icons";
import "./custom-css.css";
import styles from "../../../../Components/Elements/Loader/style.module.css";

import { useDispatch, useSelector } from "react-redux";
import { roles } from "../../../../Common/SelectFieldOption/select-field-option";
import {
  Paper,
  FilterBar,
  InputWithBtn,
  TextField,
  Table,
  SelectBox,
  DatePicker,
  Button,
  Loader,
  GroupedButtons,
  Modal,
  Checkbox,
  FancyBox,
} from "../../../../Components/Elements";
import {
  getAllUserData,
  editUser,
} from "../../../../store/actions/request-actions";

// single source of truth for dropdown options (name shown <-> id sent to API)
const USER_ROLES = [
  { name: "Security Administrator", value: 1 },
  { name: "System Administrator", value: 2 },
  { name: "Investigation Officer", value: 3 },
  { name: "Investigation Manager", value: 4 },
  { name: "QA Manager", value: 5 },
  { name: "MIS Manager", value: 6 },
  { name: "Auditor", value: 7 },
];
const USER_STATUSES = [
  { name: "Enabled", value: 1 },
  { name: "Disabled", value: 2 },
  { name: "Locked", value: 3 },
  { name: "Closed", value: 4 },
  { name: "Dormant", value: 9 },
];
const ROLE_NAMES = USER_ROLES.map((r) => r.name);
const STATUS_NAMES = USER_STATUSES.map((s) => s.name);

const roleNameById = (id) => {
  const found = USER_ROLES.find((r) => r.value === id);
  return found ? found.name : "";
};
const statusNameById = (id) => {
  const found = USER_STATUSES.find((s) => s.value === id);
  return found ? found.name : "";
};

// true when a field actually holds a value (treats "", null, undefined,
// empty arrays and the -99999999999999999999 "empty number" sentinel as empty)
const hasValue = (v) =>
  v !== undefined &&
  v !== null &&
  v !== "" &&
  v !== -99999999999999999999 &&
  !(Array.isArray(v) && v.length === 0);

// show the label only when the field has a value, otherwise "" (placeholder only)
const lbl = (value, text) => (hasValue(value) ? text : "");

const AddEditUsers = () => {
  const { Title } = Typography;
  const requestReducer = useSelector((state) => state.requestReducer);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const [id, setId] = useState();
  const [classificationofAdvance, setclassificationofAdvance] = useState({
    UserIdToEdit: null,
    email: "",
    fK_GSSUserRoleID: "",
    fK_GSSUserStatusID: "",
  });
  const [actions, setAction] = useState({
    add: false,
    edit: false,
    status: false,
    update: false,
  });
  const [row, setRows] = useState([]);
  const [form, setForm] = useState({
    LoginID: "",
    SelectRole: 0,
    SelectStaus: 0,
  });
  // search dropdown values (selected NAME, "" when nothing selected)
  const [userRoleValue, setUserRoleValue] = useState("");
  const [userStatusValue, setUserStatusValue] = useState("");
  // edit modal dropdown values (selected NAME)
  const [userMRole, setMUserRole] = useState("");
  const [userMStatus, setMUserStatus] = useState("");

  const [searchData, setSearchData] = useState({
    LoginID: "",
    Email: "",
    FirstName: "",
    LastName: "",
    UserRole: 0,
    UserStatus: 0,
  });
  const [resetSearchData, setResetSearchData] = useState({
    LoginID: "",
    Email: "",
    FirstName: "",
    LastName: "",
    UserRole: 0,
    UserStatus: 0,
  });

  // text fields (Login ID / First Name / Last Name)
  const fieldsHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  // search: Select Role dropdown (also handles the clear "x")
  const searchRoleHandler = (e, val) => {
    const role = USER_ROLES.find((r) => r.name === val);
    setUserRoleValue(role ? role.name : "");
    setSearchData((prev) => ({ ...prev, UserRole: role ? role.value : 0 }));
  };

  // search: Select Status dropdown (also handles the clear "x")
  const searchStatusHandler = (e, val) => {
    const status = USER_STATUSES.find((s) => s.name === val);
    setUserStatusValue(status ? status.name : "");
    setSearchData((prev) => ({
      ...prev,
      UserStatus: status ? status.value : 0,
    }));
  };

  // edit modal: Select Role dropdown
  const editRoleHandler = (e, val) => {
    const role = USER_ROLES.find((r) => r.name === val);
    // if (role) {
    setMUserRole(role ? role.name : "");
    setForm((prev) => ({ ...prev, SelectRole: role ? role.value : 0 }));
    // }
  };

  // edit modal: Select Status dropdown
  const editStatusHandler = (e, val) => {
    const status = USER_STATUSES.find((s) => s.name === val);
    // if (status) {
    setMUserStatus(status ? status.name : "");
    setForm((prev) => ({ ...prev, SelectStaus: status ? status.value : 0 }));
    // }
  };

  // for search
  const searchHandler = () => {
    dispatch(getAllUserData(searchData));
  };
  // cleare all states
  const resetData = () => {
    setSearchData({
      LoginID: "",
      Email: "",
      FirstName: "",
      LastName: "",
      UserRole: 0,
      UserStatus: 0,
    });
    setUserRoleValue("");
    setUserStatusValue("");
    setForm({ LoginID: "", SelectRole: 0, SelectStaus: 0 });
    dispatch(getAllUserData(resetSearchData));
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible2(false);
    setAction({ add: false, edit: false, status: false, update: false });
    setForm({ LoginID: "", SelectRole: 0, SelectStaus: 0 });
  };
  const handleProceed = async () => {
    setIsModalVisible2(false);
    await dispatch(editUser(form, resetSearchData));
    setForm({ LoginID: "", SelectRole: 0, SelectStaus: 0 });
  };
  const columns = [
    {
      title: "LoginID",
      dataIndex: "userLDAPAccount",
      key: "userLDAPAccount",
      align: "center",
      width: "20%",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "20%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "fK_GSSUserRoleID",
      key: "fK_GSSUserRoleID",
      render: (text) => <div>{roleNameById(text)}</div>,
      align: "center",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "fK_GSSUserStatusID",
      key: "fK_GSSUserStatusID",
      align: "center",
      width: "20%",
      render: (text) => (
        <>
          {text === 1 ? (
            <div className="icon-check icon-size-one greenTick u-cursor-pointer"></div>
          ) : text === 2 ? (
            <div className="icon-not-allowed icon-size-one crossRed u-cursor-pointer"></div>
          ) : text === 3 ? (
            <div className="icon-lock icon-size-one crossRed u-cursor-pointer"></div>
          ) : (
            <div className="icon-close icon-size-one crossRed u-cursor-pointer"></div>
          )}
        </>
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <div
          onClick={(e) => edit(e, record)}
          className="icon-edit icon-size-one beachGreen u-cursor-pointer"
        />
      ),
    },
  ];

  const buttonProps = {
    primaryButton: {
      text: "Proceed",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "",
      click: () => handleProceed(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "",
      disable: "",
      click: () => handleCancel(),
    },
  };
  const editButtonProps = {
    primaryButton: {
      text: "Update",
      icon: <i className="icon-update icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "",
      disable: userMRole === "" || userMStatus === "" ? true : false,
      click: () => update(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "",
      disable: "",
      click: () => handleCancel(),
    },
  };

  // open edit modal with the selected row's current role/status preselected
  const edit = (e, record) => {
    setMUserRole(roleNameById(record.fK_GSSUserRoleID));
    setMUserStatus(statusNameById(record.fK_GSSUserStatusID));
    setForm({
      LoginID: record.userID,
      SelectRole: record.fK_GSSUserRoleID,
      SelectStaus: record.fK_GSSUserStatusID,
    });
    setclassificationofAdvance({
      ...classificationofAdvance,
      UserIdToEdit: record.userID,
      email: record.userLDAPAccount,
      fK_GSSUserRoleID: record.fK_GSSUserRoleID,
      fK_GSSUserStatusID: record.fK_GSSUserStatusID,
    });
    setIsModalVisible(true);
  };

  // `form` already holds the role/status ids (set on edit() and by the edit
  // dropdown handlers), so just move on to the confirmation modal
  const update = () => {
    setIsModalVisible(false);
    setIsModalVisible2(true);
    console.log(userMRole, userMStatus, "Cehckstatusandroel");
  };

  // Api call for user data
  useEffect(() => {
    dispatch(getAllUserData(searchData));
  }, []);

  // User data Responce
  useEffect(() => {
    if (requestReducer.ResponseMessage == "Record Found") {
      var addKey = requestReducer.UserDetails.map((item, index) => {
        return { ...item, key: index };
      });
      setRows(addKey);
    }
  }, [requestReducer.UserDetails]);

  return (
    <>
      <Title className="EditUserTitle" level={3}>
        Edit User
      </Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label={lbl(searchData.LoginID, "Login ID")}
            placeholder={"Login ID"}
            size="small"
            name="LoginID"
            value={searchData.LoginID}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label={lbl(searchData.FirstName, "First Name")}
            placeholder={"First Name"}
            size="small"
            name="FirstName"
            value={searchData.FirstName}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label={lbl(searchData.LastName, "Last Name")}
            placeholder={"Last Name"}
            size="small"
            name="LastName"
            value={searchData.LastName}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label={lbl(userRoleValue, "Select Role")}
            placeholder={"Select Role"}
            size="small"
            height="10px!important"
            option={ROLE_NAMES}
            name="UserRole"
            value={userRoleValue}
            change={searchRoleHandler}
          />
        </Col>
      </Row>
      <Row gutter={8} className="u-margin-top-22px">
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label={lbl(userStatusValue, "Select Status")}
            placeholder={"Select Status"}
            size="small"
            height="10px!important"
            option={STATUS_NAMES}
            name="UserStatus"
            value={userStatusValue}
            change={searchStatusHandler}
          />
        </Col>
        <Col md={4} lg={4} sm={24}>
          <Button
            applyClass="btnDarkSolid"
            text="Search"
            icon={<i className="icon-search icon-size-one"></i>}
            click={searchHandler}
          />
        </Col>
        <Col md={4} lg={4} sm={24}>
          <Button
            text="Reset"
            icon={<i className="icon-reset icon-size-one"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={resetData}
          />
        </Col>
      </Row>
      <Row className="u-margin-top-10px">
        <Col md={24} lg={24} sm={24}>
          <Table
            rows={row}
            columns={columns}
            scroll={{ x: "max-content" }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "30"],
            }}
          />
        </Col>
      </Row>

      {/* modal starts here */}
      <Modal
        modalTitle={
          <h3>
            <b>Edit User</b>
          </h3>
        }
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
      >
        <div className="u-padding-40px u-display-flex u-justify-content-center u-flex-direction-column">
          <TextField
            focus
            disable
            label="Email"
            fullWidth
            value={classificationofAdvance.email}
            disabled={true}
          />
          <div className="u-margin-top-3pct" />
          <Row gutter={16}>
            <Col md={12} lg={12} sm={12}>
              <SelectBox
                label={lbl(userMRole, "Select Role")}
                placeholder={"Select Role"}
                name="SelectRole"
                option={ROLE_NAMES}
                value={userMRole}
                change={editRoleHandler}
              />
            </Col>
            <Col md={12} lg={12} sm={12}>
              <SelectBox
                label={lbl(userMStatus, "Select Status")}
                placeholder={"Select Status"}
                name="SelectStaus"
                option={STATUS_NAMES}
                value={userMStatus}
                change={editStatusHandler}
              />
            </Col>
          </Row>
          <div className="u-margin-top-7pct" />
          <GroupedButtons data={editButtonProps} />
        </div>
      </Modal>
      {/* a separate modal for edit user prompt */}
      <>
        <Modal
          closeModal={handleCancel}
          modalState={isModalVisible2}
          width={700}
        >
          <div className="u-padding-40px u-display-flex u-align-items-center u-justify-content-center ">
            <div className="icon-update-user icon-size-two" />
            <Title level={3} style={{ margin: 0, textAlign: "center" }}>
              Are you sure you want to update this user?
            </Title>
          </div>
          <div className="u-margin-top-7pct" />
          <GroupedButtons data={buttonProps} />
        </Modal>
      </>
      {requestReducer.Loading ? (
        <Loader loaderstyle="authenticationLoaderStyle" />
      ) : null}
    </>
  );
};

export default AddEditUsers;
