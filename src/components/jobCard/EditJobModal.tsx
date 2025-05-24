import { Modal, Form, Select, InputNumber, Row, Col } from "antd";
import type { Job } from "./types/types";

const { Option } = Select;

interface EditJobModalProps {
  job: Job;
  onFinish: (values: Partial<Job>) => void;
  onCancel: () => void;
}

const EditJobModal = ({ job, onFinish, onCancel }: EditJobModalProps) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Edit Job Posting"
      open={true}
      onOk={() => form.submit()}
      onCancel={onCancel}
      width={700}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        initialValues={{
          ...job,
          employmentType: job.employmentType || [],
          technologies: job.technologies || [],
        }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="location" label="Work Location">
          <Select>
            <Option value="remote">Remote</Option>
            <Option value="office">Office</Option>
            <Option value="hybrid">Hybrid</Option>
          </Select>
        </Form.Item>

        <Form.Item name="employmentType" label="Employment Type">
          <Select mode="multiple">
            <Option value="fulltime">Full-time</Option>
            <Option value="parttime">Part-time</Option>
            <Option value="contract">Contract</Option>
            <Option value="internship">Internship</Option>
          </Select>
        </Form.Item>

        <Form.Item name="level" label="Experience Level">
          <Select>
            <Option value="intern">Intern</Option>
            <Option value="junior">Junior (0-2 years)</Option>
            <Option value="mid">Mid-level (2-5 years)</Option>
            <Option value="senior">Senior (5+ years)</Option>
            <Option value="lead">Lead/Architect</Option>
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="salaryFrom" label="Salary Range ($) - Min">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="salaryTo" label="Salary Range ($) - Max">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="technologies" label="Required Technologies">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            tokenSeparators={[","]}
            placeholder="Add technologies (e.g. Node.js, React)"
          >
            {job.technologies?.map((tech) => (
              <Option key={tech} value={tech}>
                {tech}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditJobModal;
