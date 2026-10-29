import React from "react";
import { Layout } from "antd";
import { useLocation } from "react-router";
import Footer from "../Footer/footer";
import styles from "./main.module.css";
import { MaxWidthContainer } from "../../Elements";
import CustomRoutes from "../../../Routes/CustomRoutes";

// Pages whose filter fields wrap onto several lines get the shared field
// spacing (see .formPage in main.module.css) so wrapped lines don't touch.
// FRMU main switches this on for its dispute forms; Security Admin has none,
// so it lists its own filter pages instead.
const FORM_PAGES = ["AddEditUsers", "UserReports"];

const Main = ({
  routingData,
  role
}) => {
  const { Content } = Layout;
  const page = useLocation().pathname.split("/").pop();
  const isFormPage = FORM_PAGES.includes(page);
  return (
    <Layout>
      <Content
        className={`${styles.mainContainer} ${isFormPage ? styles.formPage : ""}`}
      >
        <MaxWidthContainer>
        <CustomRoutes RoutingData={routingData} Role={role}/>
        </MaxWidthContainer>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Main;
