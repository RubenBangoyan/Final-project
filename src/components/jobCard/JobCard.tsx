import {
  Card,
  Tag,
  Typography,
  Row,
  Col,
  message,
  Button,
  Popconfirm,
} from "antd";
import type { Job } from "./types/types";
import { useState, type FC } from "react";
import {
  EnvironmentOutlined,
  DollarOutlined,
  UserOutlined,
  ToolOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";
import "./JobCard.css";
import { useAppSelector } from "../../app/hook";
import { deleteJob, updateJob } from "./JobService";
import EditJobModal from "./EditJobModal";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/paths";

const { Text } = Typography;

interface JobCardProps {
  job: Job;
  onDelete?: (id: string) => void;
  onUpdate?: (updatedJob: Job) => void;
  showActions?: boolean; // optional prop (can be overridden)
}

const JobCard: FC<JobCardProps> = ({
  job,
  onDelete,
  onUpdate,
  showActions,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const currentUserId = useAppSelector((state) => state.user.id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isOwner = currentUserId === job.ownerID;
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Default: true, but false if current path is "/jobs"
  const shouldShowActions =
    typeof showActions === "boolean"
      ? showActions
      : location.pathname !== ROUTES.JOBS_PATH;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isActionElement =
      target.closest("button") ||
      target.closest(".ant-modal") ||
      target.closest(".ant-popover");

    if (!isActionElement) {
      navigate(`${ROUTES.JOBS_PATH}/${job.id}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(job.id);
      message.success("Job vacancy deleted successfully");
      onDelete?.(job.id);
      navigate(0);
    } catch (error) {
      message.error("Error while deleting the job vacancy");
    }
  };

  const handleUpdate = async (updatedData: Partial<Job>) => {
    try {
      await updateJob(job.id, updatedData);
      message.success("Vacancy updated!");
      onUpdate?.({ ...job, ...updatedData });
      setIsEditModalOpen(false);
      navigate(0);
    } catch (error) {
      message.error("Error while updating the job vacancy");
    }
  };

  return (
    <>
      <Card
        hoverable
        title={`${job.position} @ ${job.companyName}`}
        className={`job-card ${isDark ? "job-card-dark" : "job-card-light"}`}
        style={{ marginBottom: 16 }}
        onClick={handleCardClick}
        actions={
          shouldShowActions && isOwner
            ? [
                <Button
                  key="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </Button>,
                <Popconfirm
                  key="delete"
                  title="Delete job vacancy?"
                  description="Are you sure you want to delete this vacancy?"
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    handleDelete();
                  }}
                  onCancel={(e) => e?.stopPropagation()}
                  okText="Yes"
                  cancelText="Cancel"
                >
                  <Button
                    danger
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Delete
                  </Button>
                </Popconfirm>,
              ]
            : []
        }
      >
        <Row gutter={[12, 8]}>
          <Col span={24}>
            <Text strong>
              <EnvironmentOutlined /> Location:
            </Text>{" "}
            {job.location}
          </Col>
          <Col span={24}>
            <Text strong>
              <AppstoreAddOutlined /> Type:
            </Text>{" "}
            {job.employmentType.map((type) => (
              <Tag color="blue" key={type}>
                {type}
              </Tag>
            ))}
          </Col>
          <Col span={24}>
            <Text strong>
              <UserOutlined /> Level:
            </Text>{" "}
            {job.level}
          </Col>
          <Col span={24}>
            <Text strong>
              <DollarOutlined /> Salary:
            </Text>{" "}
            ${job.salaryFrom} - ${job.salaryTo}
          </Col>
          <Col span={24}>
            <Text strong>
              <ToolOutlined /> Tech:
            </Text>{" "}
            {job.technologies.map((tech) => (
              <Tag color="geekblue" key={tech}>
                {tech}
              </Tag>
            ))}
          </Col>
        </Row>
      </Card>

      {isEditModalOpen && (
        <EditJobModal
          job={job}
          onFinish={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default JobCard;
