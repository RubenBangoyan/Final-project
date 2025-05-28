import { Input, Select, Slider, Row, Col, Spin, Empty } from "antd";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import JobCard from "../../components/jobCard/JobCard";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Jobs.css";

const { Search } = Input;
const { Option } = Select;

const Jobs = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [employmentFilter, setEmploymentFilter] = useState<string | undefined>();
  const [techFilter, setTechFilter] = useState<string | undefined>();
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 50000]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const allJobs = await getAllJobs();
        setJobs(allJobs);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q") || "";
    setQuery(q);
  }, [location.search]);

  useEffect(() => {
    if (location.state?.newJob) {
      setJobs((prevJobs) => [location.state.newJob, ...prevJobs]);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      job.position.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase()) ||
      job.employmentType.some((type) =>
        type.toLowerCase().includes(query.toLowerCase())
      );

    const matchesEmployment = employmentFilter
      ? job.employmentType.includes(employmentFilter)
      : true;

    const matchesTech = techFilter
      ? job.technologies.includes(techFilter)
      : true;

    const matchesSalary =
      job.salaryFrom <= salaryRange[1] && job.salaryTo >= salaryRange[0];

    return matchesQuery && matchesEmployment && matchesTech && matchesSalary;
  });

  const allEmploymentTypes = Array.from(
    new Set(jobs.flatMap((job) => job.employmentType))
  );
  const allTechnologies = Array.from(
    new Set(jobs.flatMap((job) => job.technologies))
  );

  const handleDeleteJob = (deletedId: string) => {
    setJobs(jobs.filter((job) => job.id !== deletedId));
  };

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
  };

  const handleJobClick = (id: string) => {
    navigate(`/jobs/${id}`);
  };

  return (
    <div className={`job-container ${theme === "dark" ? "job-dark" : "job-light"}`}>
      <Row gutter={[16, 16]} className="job-filters">
        <Col span={6}>
          <Search
            value={query}
            allowClear
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by position, location, or type"
          />
        </Col>
        <Col span={6}>
          <Select
            allowClear
            value={employmentFilter}
            style={{ width: "100%" }}
            placeholder="Filter by employment type"
            onChange={(value) => setEmploymentFilter(value)}
          >
            {allEmploymentTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            allowClear
            value={techFilter}
            placeholder="Filter by technology"
            onChange={(value) => setTechFilter(value)}
            style={{ width: "100%" }}
          >
            {allTechnologies.map((tech) => (
              <Option key={tech} value={tech}>
                {tech}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Slider
            range
            min={0}
            step={1000}
            max={50000}
            value={salaryRange}
            onChange={(value) => setSalaryRange(value as [number, number])}
            tooltip={{ formatter: (val) => `$${val}` }}
          />
        </Col>
      </Row>

      {loading ? (
        <Spin tip="Loading..." size="large">
          <div style={{ height: "200px" }} />
        </Spin>
      ) : filteredJobs.length === 0 ? (
        <Empty
          className={theme === "dark" ? "empty-dark" : "empty-light"}
          description="No jobs found matching your criteria."
        />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredJobs.map((job) => (
            <Col key={job.id} xs={24} sm={12} md={8} lg={6} onClick={() => handleJobClick(job.id)}>
              <JobCard job={job} onDelete={handleDeleteJob} onUpdate={handleUpdateJob} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Jobs;
