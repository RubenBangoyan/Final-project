import { Button, Card, Form, Input, message, Col, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  PhoneFilled,
  MailFilled,
  GlobalOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./Contact.css";
import { useTheme } from "../../contexts/ThemeContext";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [form] = Form.useForm<FormValues>();
  const { theme } = useTheme();

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    message.success("Message sent successfully!");
    form.resetFields();
  };

  const { Title, Paragraph, Link } = Typography;

  return (
    <div
      className={`contact-container ${
        theme === "dark" ? "contact-dark" : "contact-light"
      }`}
    >
      <Row gutter={[32, 32]} justify="center" className="contact-container">
        <Col span={24}>
          <Title level={2} className={`contact-title ${theme}`}>
            Contact Us
          </Title>
        </Col>

        <Col span={24} xs={24} sm={24} md={24} lg={20} xl={18}>
          <Card className={`contact-info ${theme}`}>
            <Row justify="center" gutter={[16, 16]}>
              <Col xs={24} sm={8} className="contact-col">
                <Paragraph>
                  <PhoneFilled className={`contact-icon ${theme}`} /> +374 00
                  00-00-00
                </Paragraph>
              </Col>
              <Col xs={24} sm={8} className="contact-col">
                <Paragraph>
                  <MailFilled className={`contact-icon ${theme}`} />{" "}
                  example@gmail.com
                </Paragraph>
              </Col>
              <Col xs={24} sm={8} className="contact-col">
                <Paragraph>
                  <GlobalOutlined className={`contact-icon ${theme}`} />{" "}
                  Yerevan, Armenia
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} xs={24} sm={24} md={24} lg={20} xl={18}>
          <Row
            gutter={[32, 32]}
            justify="center"
            className="contact-form-map-row"
          >
            <Col xs={24} md={12}>
              <Card className="contact-form-card">
                <Form
                  className={`form ${theme}`}
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name!" },
                    ]}
                  >
                    <Input placeholder="Your name" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      { type: "email", message: "Invalid email format!" },
                    ]}
                  >
                    <Input placeholder="Your email" />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                      { required: true, message: "Please enter your message!" },
                    ]}
                  >
                    <TextArea rows={4} placeholder="Your message" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Send
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.4895820631767!2d44.50349097652643!3d40.17720097939326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4041bcd487aa1f7d%3A0x78f7de0b4f4f5c!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1689758479185!5m2!1sen!2s"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            </Col>
          </Row>
        </Col>

        <Col span={24} xs={24} sm={24} md={24} lg={20} xl={18}>
          <Card className={`contact-info ${theme}`}>
            <Title level={2}>Our Social Media</Title>
            <Row gutter={[32, 32]} justify="center">
              <Col
                xs={24}
                sm={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookOutlined
                    style={{ color: "#3b5998", fontSize: 24 }}
                  />{" "}
                  Facebook
                </Link>
              </Col>
              <Col
                xs={24}
                sm={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramOutlined
                    style={{ color: "#e1306c", fontSize: 24 }}
                  />{" "}
                  Instagram
                </Link>
              </Col>
              <Col
                xs={24}
                sm={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinOutlined
                    style={{ color: "#0A66C2", fontSize: 24 }}
                  />{" "}
                  LinkedIn
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;