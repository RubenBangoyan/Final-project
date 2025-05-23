import { Input, Select, Slider, Row, Col, Spin, Empty } from "antd";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import JobCard from "../../components/jobCard/JobCard";
import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "./Home.css";

const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState<
    string | undefined
  >();
  const [techFilter, setTechFilter] = useState<string | undefined>();
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 50000]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
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

  return (
    <div
      className={theme === "dark" ? "homepage-dark" : "homepage-light"}
      style={{ padding: "2rem" }}
    >
      <Row gutter={16} style={{ marginBottom: "1rem" }}>
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
        <Spin size="large" />
      ) : filteredJobs.length === 0 ? (
        <Empty
          className={theme === "dark" ? "empty-dark" : "empty-light"}
          description="No jobs found matching your criteria."
        />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredJobs.map((job) => (
            <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
