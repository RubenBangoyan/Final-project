import { useEffect, useState } from "react";
import { Input, Select, Slider, Row, Col, Spin, Empty, Button } from "antd";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import JobCard from "../../components/jobCard/JobCard";
import { useTheme } from "../../contexts/ThemeContext";
import "./Jobs.css";
import { useFilter } from "../../hooks/useFilter";
import { useAppSelector } from "../../app/hook";

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
  const [separateMyJobs, setSeparateMyJobs] = useState(false);
  const currentUserId = useAppSelector((state) => state.user.id);

  const {
    currentFilters,
    updateFilter,
    resetFilter,
    resetAllFilter,
    canReset,
  } = useFilter(initialFilters);

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

  const myJobs = filteredJobs.filter((job) => job.ownerID === currentUserId);
  const otherJobs = filteredJobs.filter((job) => job.ownerID !== currentUserId);

  return (
    <Row
      justify="center"
      className={`container ${theme === "dark" ? "job-dark" : "job-light"}`}
    >
      <Col span={24}>
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
          {canReset && (
            <Row gutter={[8, 8]} className="resetAll-btn">
              <Col span={6} style={{ paddingRight: 150 }}>
                <Button
                  onClick={resetAllFilter}
                  style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                >
                  Reset All Filters
                </Button>
              </Col>
              <Col span={24}>
                <div className="filter-container">
                  {Object.entries(currentFilters).map(([key, value]) => {
                    const initialValue =
                      initialFilters[key as keyof initialFiltersTypes];
                    const isDefault =
                      JSON.stringify(value) === JSON.stringify(initialValue);
                    if (isDefault) return null;

                    let label = "";
                    if (key === "searchValue") {
                      label = `Search: ${value}`;
                    } else if (key === "employmentFilter") {
                      label = `Employment: ${value}`;
                    } else if (key === "techFilter") {
                      label = `Technology: ${value}`;
                    } else if (key === "salaryRange") {
                      label = `Salary: $${(value as number[])[0]} - $${
                        (value as number[])[1]
                      }`;
                    }

                    return (
                      <Button
                        key={key}
                        size="small"
                        onClick={() =>
                          resetFilter(key as keyof initialFiltersTypes)
                        }
                        className="filter-btn"
                      >
                        {label} ✕
                      </Button>
                    );
                  })}
                </div>
              </Col>
            </Row>
          )}
        </Row>

        <Row justify="start" style={{ marginBottom: 16 }}>
          <Col>
            <Button onClick={() => setSeparateMyJobs((prev) => !prev)}>
              {separateMyJobs ? "Show All Jobs" : "Separate My Jobs"}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {loading ? (
              <Spin tip="Loading..." size="large">
                <div style={{ height: "200px" }} />
              </Spin>
            ) : filteredJobs.length === 0 ? (
              <Empty
                className={theme === "dark" ? "empty-dark" : "empty-light"}
                description="No jobs found matching your criteria."
              />
            ) : separateMyJobs ? (
              <>
                {myJobs.length > 0 && (
                  <>
                    <Row style={{ marginBottom: 8 }}>
                      <Col span={24}>
                        <h2>My Jobs</h2>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      {myJobs.map((job) => (
                        <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
                          <JobCard job={job} />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
                {otherJobs.length > 0 && (
                  <>
                    <Row style={{ marginTop: 24, marginBottom: 8 }}>
                      <Col span={24}>
                        <h2>Other Jobs</h2>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      {otherJobs.map((job) => (
                        <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
                          <JobCard job={job} />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </>
            ) : (
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <h2>All Jobs</h2>
                </Col>
                {filteredJobs.map((job) => (
                  <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
                    <JobCard job={job} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Jobs;
