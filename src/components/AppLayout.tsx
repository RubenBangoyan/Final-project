import { Flex, Layout } from "antd";
import Header from "../components/Header";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { contentStyle, layoutStyle } from "./style/AppLayout";

const AppLayout = () => {
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Flex>
  );
};

export default AppLayout;
