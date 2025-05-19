import { Button, Card, Form, Input, message } from "antd";
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

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    message.success("Message sent successfully!");
    form.resetFields();
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <Card className="contact-info">
        <div className="contact-info-content">
          <p>
            <PhoneFilled /> +374 99 99 99 99
          </p>
          <p>
            <MailFilled /> example@gmail.com
          </p>
          <p>
            <GlobalOutlined /> Yerevan, Armenia
          </p>
        </div>
      </Card>

      <div className="form-map-wrapper">
        <Form<FormValues> className="form" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
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
            <Input type="email" placeholder="Your email" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <TextArea placeholder="Your message" />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Send
          </Button>
        </Form>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.4895820631767!2d44.50349097652643!3d40.17720097939326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4041bcd487aa1f7d%3A0x78f7de0b4f4f5c!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1689758479185!5m2!1sen!2s"
          width="600px"
          height="300"
          style={{ border: 0, borderRadius: 8 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <Card className="social-media-card">
        <h2>Our Social Media</h2>
        <div className="social-media-btn">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlined style={{ color: "#3b5998" }} />
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined style={{ color: "#e1306c" }} />
            Instagram
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined style={{ color: "#0A66C2" }} />
            LinkedIn
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Contact;
