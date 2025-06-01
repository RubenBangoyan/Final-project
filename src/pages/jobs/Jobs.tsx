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
  Typography,
} from "antd";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import JobCard from "../../components/jobCard/JobCard";
import { useTheme } from "../../contexts/ThemeContext";
import "./Jobs.css";
import { useFilter } from "../../hooks/useFilter";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { motion } from "framer-motion";

const { Title } = Typography;

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
  const location = useLocation();

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

  const debouncedSearchValue = searchValue;

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
    const searchFromHome = location.state?.search;
    if (searchFromHome) {
      updateAndResetPage("searchValue", searchFromHome);
    }
  }, [location.state]);

  useEffect(() => {
    setLoading(true);

    getAllJobs({
      employmentType: employmentFilter ?? undefined,
      technology: techFilter ?? undefined,
      salaryFrom: salaryRange[0],
      salaryTo: salaryRange[1],
    })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [employmentFilter, techFilter, salaryRange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const filteredJobs = jobs.filter((job) => {
    const query = debouncedSearchValue.toLowerCase();
    const matchesQuery =
      query === "" ||
      job.position.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query);
    return matchesQuery;
  });

  const paginatedJobs = filteredJobs.slice((page - 1) * limit, page * limit);

  const allEmploymentTypes = Array.from(
    new Set(jobs.flatMap((job) => job.employmentType))
  );

  const allTechnologies = Array.from(
    new Set(jobs.flatMap((job) => job.technologies))
  );

  const isInMyJobsPage = location.pathname === ROUTES.PROFILE_PATH;

  const currentTheme = theme === "dark" ? "job-dark" : "job-light";

  return (
    <div className={`job-page-wrapper ${currentTheme}`}>
      <Row justify="center">
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
              <Col span={24}>
                <Row
                  gutter={[16, 16]}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Col>
                    <Button
                      onClick={resetAllFilter}
                      style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                    >
                      Reset All Filters
                    </Button>
                  </Col>
                  <Col>
                    <Row gutter={[8, 8]} className="filter-container">
                      {Object.entries(currentFilters).map(([key, value]) => {
                        const initialValue =
                          initialFilters[key as keyof initialFiltersTypes];
                        const isDefault =
                          JSON.stringify(value) ===
                          JSON.stringify(initialValue);
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
                          <Col key={key}>
                            <Button
                              size="small"
                              onClick={() =>
                                resetFilter(key as keyof initialFiltersTypes)
                              }
                              className="filter-btn"
                            >
                              {label} ✕
                            </Button>
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                </Row>
              </Col>
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
                      <Title level={3} className="job-section-title">
                        All Jobs
                      </Title>
                    </Col>
                    {paginatedJobs.map((job) => (
                      <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <JobCard job={job} showActions={isInMyJobsPage} />
                        </motion.div>
                      </Col>
                    ))}
                  </Row>

                  <Row
                    justify="center"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
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
    </div>
  );
};

export default Jobs;
