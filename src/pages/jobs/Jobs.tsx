import { useEffect, useState } from "react";
import {
  Input,
  Select,
  Slider,
  Row,
  Col,
  Spin,
  Empty,
  Button,
  Pagination,
} from "antd";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import JobCard from "../../components/jobCard/JobCard";
import { useTheme } from "../../contexts/ThemeContext";
import "./Jobs.css";
import { useFilter } from "../../hooks/useFilter";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/paths";

const { Search } = Input;
const { Option } = Select;

type initialFiltersTypes = {
  searchValue: string;
  employmentFilter: string | null;
  techFilter: string | null;
  salaryRange: number[];
  page: number;
  limit: number;
};

const initialFilters: initialFiltersTypes = {
  searchValue: "",
  employmentFilter: null,
  techFilter: null,
  salaryRange: [0, 100000],
  page: 1,
  limit: 10,
};

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const {
    currentFilters,
    updateFilter,
    resetFilter,
    resetAllFilter,
    canReset,
  } = useFilter(initialFilters);

  const {
    searchValue,
    employmentFilter,
    techFilter,
    salaryRange,
    page,
    limit,
  } = currentFilters;

  const updateAndResetPage = <K extends keyof typeof initialFilters>(
    key: K,
    value: (typeof initialFilters)[K]
  ) => {
    updateFilter(key, value);
    if (key !== "page") updateFilter("page", 1);
  };

  const handlePageChange = (newPage: number) => {
    updateFilter("page", newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    updateFilter("limit", newPageSize);
    updateFilter("page", 1);
  };

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

  const paginatedJobs = filteredJobs.slice((page - 1) * limit, page * limit);

  const allEmploymentTypes = Array.from(
    new Set(jobs.flatMap((job) => job.employmentType))
  );

  const allTechnologies = Array.from(
    new Set(jobs.flatMap((job) => job.technologies))
  );

  const location = useLocation();
  const isInMyJobsPage = location.pathname === ROUTES.PROFILE_PATH;

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
              onChange={(e) =>
                updateAndResetPage("searchValue", e.target.value)
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
              onChange={(value) =>
                updateAndResetPage("employmentFilter", value)
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
              onChange={(value) => updateAndResetPage("techFilter", value)}
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
              onChange={(value) =>
                updateAndResetPage("salaryRange", value as number[])
              }
              tooltip={{ formatter: (val) => `$${val}` }}
            />
          </Col>
          {canReset && (
            <Row gutter={[8, 8]} className="resetAll-btn">
              <Col span={6} style={{ paddingLeft: 12 }}>
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
                    if (isDefault || key === "page" || key === "limit")
                      return null;

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
            ) : (
              <>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <h2>All Jobs</h2>
                  </Col>
                  {paginatedJobs.map((job) => (
                    <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
                      <JobCard job={job} showActions={isInMyJobsPage} />
                    </Col>
                  ))}
                </Row>

                <Row justify="center" style={{ marginTop: 20 }}>
                  <Pagination
                    current={page}
                    pageSize={limit}
                    total={filteredJobs.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    onShowSizeChange={handlePageSizeChange}
                  />
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Jobs;
