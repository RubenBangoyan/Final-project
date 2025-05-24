import { Form, Input, Select, Button, InputNumber, Modal } from "antd";
import { serverTimestamp } from "firebase/firestore";
// import { auth } from "../../services/firebse-config"; // неиспользуемый импорт можно убрать
// import { db } from "../../services/firebse-config"; // неиспользуемый импорт можно убрать
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { ROUTES } from "../../routes/paths";
import { addJob } from "../../components/jobCard/JobService";
import type { OfferingWorkFormValues } from "./types/types";

const { Option } = Select;

const UploadWork = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.id);

  const onFinish = async (values: OfferingWorkFormValues) => {
    try {
      if (!id) {
        console.error("ID is null. Cannot create document.");
        return;
      }

      const dataToSave = {
        ...values,
        companyWebsite: values.companyWebsite || "",
        aboutCompany: values.aboutCompany || "",
        category: values.category || "",
        level: values.level || "",
        technologies: values.technologies || [],
        employmentType: values.employmentType || [],
        location: values.location || "",
        requirements: values.requirements || "",
        telegram: values.telegram || "",
        salaryFrom: values.salaryFrom !== undefined ? values.salaryFrom : 0,
        salaryTo: values.salaryTo !== undefined ? values.salaryTo : 0,
        ownerID: id,
        createdAt: serverTimestamp(),
      };

      const newJobId = await addJob(dataToSave);
      console.log("Данные успешно сохранены!", newJobId);
      navigate(ROUTES.HOME_PATH);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  const handleGoBack = () => {
    Modal.confirm({
      title: "Discard Form?",
      content:
        "Are you sure you want to go back? All entered data will be lost.",
      okText: "Yes, go back",
      cancelText: "Cancel",
      onOk: () => navigate(ROUTES.HOME_PATH),
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="companyName"
        label="Company Name"
        rules={[{ required: true, message: "Please input company name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="aboutCompany" label="About the Company">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item name="companyWebsite" label="Company Website">
        <Input placeholder="https://example.com" />
      </Form.Item>

      <Form.Item
        name="position"
        label="Open Position"
        rules={[{ required: true, message: "Please input position" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Job Category"
        rules={[{ required: true, message: "Please select a job category" }]}
      >
        <Select placeholder="Select job category">
          <Option value="softwareDevelopment">Software Development</Option>
          <Option value="designCreative">Design & Creative</Option>
          <Option value="marketingSales">Marketing & Sales</Option>
          <Option value="dataScience">Data Science</Option>
          <Option value="customerSupport">Customer Support</Option>
          <Option value="education">Education</Option>
          <Option value="productManagement">Product Management</Option>
          <Option value="hrRecruiting">HR & Recruiting</Option>
          <Option value="legal">Legal</Option>
          <Option value="engineering">Engineering</Option>
          <Option value="finance">Finance</Option>
          <Option value="others">Others</Option>
        </Select>
      </Form.Item>

      <Form.Item name="level" label="Position Level">
        <Select placeholder="Select level">
          <Option value="intern">Intern</Option>
          <Option value="junior">Junior</Option>
          <Option value="mid">Mid</Option>
          <Option value="senior">Senior</Option>
          <Option value="lead">Lead</Option>
        </Select>
      </Form.Item>

      <Form.Item name="technologies" label="Technology Stack">
        <Select mode="tags" placeholder="e.g. React, Node.js, SQL" />
      </Form.Item>

      <Form.Item name="employmentType" label="Employment Type">
        <Select mode="multiple" placeholder="Select options">
          <Option value="fulltime">Full-time</Option>
          <Option value="parttime">Part-time</Option>
          <Option value="remote">Remote</Option>
          <Option value="freelance">Freelance</Option>
          <Option value="internship">Internship</Option>
        </Select>
      </Form.Item>

      <Form.Item name="location" label="Location (Office / Remote)">
        <Input placeholder="Moscow / remote / hybrid" />
      </Form.Item>

      <Form.Item label="Salary From (USD)" name="salaryFrom">
        <InputNumber min={0} step={100} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Salary To (USD)" name="salaryTo">
        <InputNumber min={0} step={100} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="requirements" label="Candidate Requirements">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="contactEmail"
        label="Contact Email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Please input a valid email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="telegram" label="Telegram or Other Contact">
        <Input placeholder="@yourtelegram" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>{" "}
        <Button onClick={handleGoBack}>Go Back Home</Button>
      </Form.Item>
    </Form>
  );
};

export default UploadWork;
