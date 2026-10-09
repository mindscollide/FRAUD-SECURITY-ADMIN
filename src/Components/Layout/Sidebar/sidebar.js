import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import { Layout, Menu } from "antd";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { makeTabDisable } from "../../../store/actions/ui-actions";

const Sidebar = ({ Links, ui }) => {
  const { Sider } = Layout;
  const dispatch = useDispatch();
  // Sidebar only ever mounts under /Fraud (see App.js) and isn't rendered
  // through a matched <Route>, so the base path is hardcoded (this was
  // useRouteMatch().path under react-router v5).
  const path = "/Fraud";

  // Selected/open state lives in React state (initialized once from
  // localStorage) so the controlled Menu reflects live selection.
  const [selectedKey, setSelectedKey] = useState(
    () => localStorage.getItem("child") || "1"
  );
  const [openKeys, setOpenKeys] = useState(() => [
    localStorage.getItem("parent") || "sub1",
  ]);

  // this use effect is for refreshing
  useEffect(() => {
    if (ui.activeEdit) {
      localStorage.setItem("parent", "sub1");
      localStorage.setItem("child", "2");
      window.location.reload();
    }
  }, [ui.activeEdit]);

  // Notification bell click (Header) force-selects "Create User" (key 2)
  useEffect(() => {
    if (ui.activeTab) {
      localStorage.setItem("parent", "sub1");
      localStorage.setItem("child", "2");
      setSelectedKey("2");
      setOpenKeys(["sub1"]);
    }
  }, [ui.activeTab]);

  // Accordion behaviour: only one top-level menu expanded at a time.
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : keys);
  };

  const onSelect = ({ key, keyPath }) => {
    if (key !== "2") {
      dispatch(makeTabDisable());
    }
    localStorage.setItem("parent", keyPath[1]);
    localStorage.setItem("child", keyPath[0]);
    setSelectedKey(key);
  };

  // antd v5 builds the menu from an `items` array (SubMenu/Menu.Item
  // children are deprecated). Keys are unchanged: "sub1", "sub2", ... for
  // parents and Links.js keys for children, so localStorage parent/child
  // selection still lines up.
  const menuItems = Links.map((item, index) => ({
    key: `sub${index + 1}`,
    icon: <i className={`${item.icon}`}></i>,
    label: `${item.menuName}`,
    className: styles.menuMainItem,
    children: item.subMenu.map((nestedItem) => ({
      key: String(nestedItem.key),
      label: (
        <Link to={`${path}${nestedItem.link}`} className={styles.noLinkStyles}>
          {nestedItem.name}
        </Link>
      ),
    })),
  }));

  return (
    <Sider width={230} className={styles.sider}>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        className={styles.menuSidebarStyle}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
