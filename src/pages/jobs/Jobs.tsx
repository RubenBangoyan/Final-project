import { useEffect, useState } from "react";
import { Input, Select, Slider, Row, Col, Spin, Empty, Button } from "antd";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import JobCard from "../../components/jobCard/JobCard";
import { useTheme } from "../../contexts/ThemeContext";
import "./Jobs.css";
import { useFilter } from "../../hooks/useFilter";

const { Search } = Input;
const { Option } = Select;

type initialFiltersTypes = {
  searchValue: string;
  employmentFilter: string | null;
  techFilter: string | null;
  salaryRange: number[];
};

const initialFilters: initialFiltersTypes = {
  searchValue: "",
  employmentFilter: null,
  techFilter: null,
  salaryRange: [0, 100000],
};

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const { currentFilters, updateFilter, resetAllFilter, canReset } =
    useFilter(initialFilters);

  const { searchValue, employmentFilter, techFilter, salaryRange } =
    currentFilters;

  useEffect(() => {
    setLoading(true);
    getAllJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      searchValue === "" ||
      job.position.toLowerCase().includes(searchValue.toLowerCase()) ||
      job.location.toLowerCase().includes(searchValue.toLowerCase()) ||
      job.employmentType.some((type) =>
        type.toLowerCase().includes(searchValue.toLowerCase())
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
    <div className={`container ${theme === "dark" ? "job-dark" : "job-light"}`}>
      <Row
        gutter={[16, 16]}
        className="job-filters"
        style={{ marginBottom: 10 }}
      >
        <Col span={6}>
          <Search
            value={searchValue}
            allowClear
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateFilter("searchValue", e.target.value)
            }
            placeholder="Search by position, location, or type"
          />
        </Col>
        <Col span={6}>
          <Select
            allowClear
            value={employmentFilter}
            style={{ width: "100%" }}
            placeholder="Filter by employment type"
            onChange={(value: string | null) =>
              updateFilter("employmentFilter", value)
            }
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
            onChange={(value: string | null) =>
              updateFilter("techFilter", value)
            }
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
            onChange={(value: number[]) => updateFilter("salaryRange", value)}
            tooltip={{ formatter: (val) => `$${val}` }}
          />
        </Col>
        {!!canReset && (
          <Col span={6}>
            <Button
              onClick={resetAllFilter}
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
            >
              Reset All Filters
            </Button>
          </Col>
        )}
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
            <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Jobs;
