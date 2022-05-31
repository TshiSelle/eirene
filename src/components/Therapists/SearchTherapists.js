import React, { useState, useCallback, useEffect } from "react";
import { FilterTherapists } from "../../api/ApiClient";
import { Alert, Button, Collapse, Form, Pagination } from "react-bootstrap";
import TherapistCard from "./TherapistCard";
import Pages from "./Pages";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styled from "styled-components";
import "./TherapistSearch.css";

const searchTherapists = () => {
  const [query, setQuery] = useState("");
  const [therapistTitleoption, setTherapistTitleOption] = useState("");
  const [genderoption, setGenderOption] = useState("");
  const [degreeoption, setDegreeOption] = useState("");
  const [yoeoption, setYoeOption] = useState("");
  const [pageNumberoption, setpageNumberOption] = useState(1);
  const [numOfPages, setnumOfPages] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const therapistTitles = [
    "Marriage and Family",
    "Addiction",
    "Behavioral",
    "Divorce",
    "Child",
    "Clinical",
    "Cognitive",
    "Cognitive-behavioral",
    "Eating disorder",
    "Exercise",
    "Youth",
    "Social work",
    "School",
    "Trauma",
    "Nutritional",
    "Dialectical",
    "Psychodynamic",
  ];

  useEffect(
    (event) => {
      // console.log(therapistTitleoption, genderoption, degreeoption, yoeoption)
      if (event) event.preventDefault();
      setLoading(true);
      FilterTherapists(
        query,
        therapistTitleoption,
        genderoption,
        degreeoption,
        +yoeoption.split("-")[0],
        +yoeoption.split("-")[1],
        pageNumberoption
      )
        .then((response) => {
          if (response.data.success && response.data.numOfResults > 0) {
            const { searchResults, numOfPages } = response.data;
            setData(searchResults);
            setnumOfPages(numOfPages);
            setItems(
              calcPages(pageNumberoption, numOfPages, setpageNumberOption)
            );
            setError("");
          } else {
            setError("No such therapists.");
            setpageNumberOption(1);
            setData([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          const { message } = error.response.data;
          if (message.includes("large")) {
            setError(message + " Redirecting to first page...");
            setTimeout(() => {
              setpageNumberOption(1);
              setLoading(false);
            }, 2000);
          } else {
            setError(message);
            setLoading(false);
          }
          setData([]);
          return;
        });
    },
    [
      query,
      therapistTitleoption,
      genderoption,
      degreeoption,
      yoeoption,
      pageNumberoption,
    ]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumberoption]);

  const setQueryValue = useCallback((e) => setQuery(e.target.value));

  return (
    <PageContainer>
      <PageBanner>
        <BannerHeader>Search Therapists</BannerHeader>
        <BannerPara>
          Search for a specific therapist by their name or use filter options
          according to preferred profession, gender, degree attained, or years
          of experience.
        </BannerPara>
      </PageBanner>

      <Form className="therapistSearch" onSubmit={() => event.preventDefault()}>
        <div className="searchBar">
          <Form.Control
            className="searchField"
            type="text"
            value={query}
            isInvalid={error}
            placleholder="Search..."
            name="Search For Therapists"
            id="search"
            onChange={setQueryValue}
          />
          <label htmlFor="search"></label>
          <Button className="optionBtn" onClick={() => setOpen(!open)}>
            Options{" "}
          </Button>
        </div>
        <Collapse in={open} className="collapsible">
          <Form.Group>
            <Form.Select
              as="select"
              className="dropdown dropdown-option dropdown-therapist"
              value={therapistTitleoption}
              onChange={(e) => setTherapistTitleOption(e.target.value)}
            >
              <option key="" value="">
                Therapist title (Any)
              </option>
              {therapistTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              as="select"
              className="dropdown dropdown-option dropdown-therapist"
              value={genderoption}
              onChange={(e) => setGenderOption(e.target.value)}
            >
              <option key="" value="">
                Gender (Any)
              </option>
              <option key="male" value="male">
                Male
              </option>
              <option key="female" value="female">
                Female
              </option>
            </Form.Select>
            <Form.Select
              as="select"
              className="dropdown dropdown-option dropdown-therapist"
              value={degreeoption}
              onChange={(e) => setDegreeOption(e.target.value)}
            >
              <option key="" value="">
                Degree (Any)
              </option>
              <option value="Masters">Masters</option>
              <option value="Phd">Phd</option>
            </Form.Select>
            <Form.Select
              as="select"
              className="dropdown dropdownYears dropdown-option dropdown-therapist"
              value={yoeoption}
              onChange={(e) => setYoeOption(e.target.value)}
              //   onChange={(e) => console.log(e.target.value)}
            >
              <option key="" value="">
                Years of Experience (Any)
              </option>
              <option key="0-5" value="0-5">
                0-5
              </option>
              <option key="5-10" value="5-10">
                5-10
              </option>
              <option key="10-15" value="10-15">
                10-15
              </option>
              <option key="15-20" value="15-20">
                15-20
              </option>
            </Form.Select>
          </Form.Group>
        </Collapse>
      </Form>
      {isLoading ? (
        <LoadingSpinner display={isLoading} />
      ) : (
        <>
          <div className="therapist-parent-container">
            {data.map((therapist, key) => {
              return (
                <div key={key} className="therapist-container">
                  <TherapistCard therapist={therapist} />
                </div>
              );
            })}
          </div>
          <div className="pagesContainer">
            <Pages
              items={items}
              numOfPages={numOfPages}
              currpage={pageNumberoption}
              onChange={(e) => setpageNumberOption(e)}
            />
          </div>
        </>
      )}

      {error && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
    </PageContainer>
  );
};

export default searchTherapists;

const PageContainer = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
`;

const PageBanner = styled.div`
  height: 200px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;

  @media (max-width: 991px) {
    height: unset;
    padding: 20px;
  }
`;

const BannerHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;

function calcPages(pageNumberoption, numOfPages, setpageNumberOption) {
  const showNumbers = 7;
  const start =
    pageNumberoption <= Math.floor(showNumbers / 2)
      ? 1
      : pageNumberoption - Math.floor(showNumbers / 2);
  const end =
    pageNumberoption + Math.floor(showNumbers / 2) > numOfPages
      ? numOfPages
      : pageNumberoption + Math.floor(showNumbers / 2);
  let pages = [];
  for (let number = start; number <= end; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === pageNumberoption}
        onClick={(e) => setpageNumberOption(+e.target.text)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return pages;
}
