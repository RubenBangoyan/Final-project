import qs from "qs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setSearchValue,
  setCurrentPage,
  setSalaryRange,
  setTechFilter,
  setEmploymentFilter,
  resetFilters,
} from "../../features/filter/filterSlice";
import type { RootState } from "../../app/store";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import { Row, Col, Input, Select, Slider, Spin, Empty, Button } from "antd";
import JobCard from "../../components/jobCard/JobCard";
import { useTheme } from "../../contexts/ThemeContext";

const { Search } = Input;
const { Option } = Select;

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    searchValue,
    currentPage,
    employmentFilter,
    techFilter,
    salaryRange,
  } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    const isSalaryDefault = salaryRange[0] === 0 && salaryRange[1] === 100000;
    const salaryFrom = Number(salaryRange[0]);
    const salaryTo = Number(salaryRange[1]);
    const queryParams: Record<string, any> = {
      page: currentPage,
    };
    if (searchValue !== "") {
      queryParams.q = searchValue;
    }
    if (employmentFilter) queryParams.employment = employmentFilter;
    if (techFilter) queryParams.tech = techFilter;
    if (!isSalaryDefault) {
      queryParams.salaryFrom = salaryFrom;
      queryParams.salaryTo = salaryTo;
    }

    const queryString = qs.stringify(queryParams);
    navigate(`?${queryString}`);
  }, [
    searchValue,
    currentPage,
    employmentFilter,
    techFilter,
    salaryRange,
    navigate,
  ]);

  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1));
      if (params.q) dispatch(setSearchValue(params.q as string));
      if (params.page) dispatch(setCurrentPage(Number(params.page)));
      if (params.employment)
        dispatch(setEmploymentFilter(params.employment as string));
      if (params.tech) dispatch(setTechFilter(params.tech as string));
      if (params.salaryFrom && params.salaryTo)
        dispatch(
          setSalaryRange([Number(params.salaryFrom), Number(params.salaryTo)])
        );
    }
  }, [location.search, dispatch]);

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
    <div className={`container`}>
      <Row gutter={16} style={{ marginBottom: "1rem" }}>
        <Col span={6}>
          <Search
            value={searchValue}
            allowClear
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
            placeholder="Search by position, location, or type"
          />
        </Col>
        <Col span={6}>
          <Select
            allowClear
            value={employmentFilter ?? undefined}
            style={{ width: "100%" }}
            placeholder="Filter by employment type"
            onChange={(value) => dispatch(setEmploymentFilter(value || null))}
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
            value={techFilter ?? undefined}
            placeholder="Filter by technology"
            onChange={(value) => dispatch(setTechFilter(value || null))}
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
              dispatch(setSalaryRange(value as [number, number]))
            }
            tooltip={{ formatter: (val) => `$${val}` }}
          />
        </Col>
        <Col span={6}>
          <Button
            onClick={() => dispatch(resetFilters())}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Reset All Filters
          </Button>
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
