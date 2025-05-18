import { Layout } from "antd";
import { footerStyle } from "./style/AppLayout";
const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer style={footerStyle}>
      <p>Copyright 2025</p>
    </Footer>
  );
};

export default Footer;
