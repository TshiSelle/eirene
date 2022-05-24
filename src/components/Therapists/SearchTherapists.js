import React, { useState, useCallback, useEffect } from "react";
// import { Link } from "react-router-dom";
import TherapistCard from "./TherapistCard";
import { FilterTherapists } from "../../api/ApiClient";
import {
  Alert,
  Button,
  Collapse,
  Dropdown,
  DropdownButton,
  Form,
  FormSelect,
  Pagination,
} from "react-bootstrap";
import "./TherapistSearch.css";
import Pages from "./Pages";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styled from "styled-components";

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
      if (!query) return;
      setLoading(true);
      FilterTherapists(
        query,
        therapistTitleoption,
        genderoption,
        degreeoption,
        +yoeoption.toString().substring(0, 2),
        +yoeoption.toString().substring(2),
        pageNumberoption
      )
        .then((response) => {
          if (response.data.success) {
            setData(response.data.searchResults);
            const numOfPages = response.data.numOfPages;
            setnumOfPages(response.data.numOfPages);
            setError("");
            const showNumbers = 11;
            const start =
              pageNumberoption - Math.floor(showNumbers / 2) <= 0
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
            setItems(pages);
          } else {
            setError(response.data.message);
            setData([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setData([]);
          setLoading(false);
		  setpageNumberOption(1)
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
              className="dropdown"
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
              className="dropdown"
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
              className="dropdown"
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
              className="dropdown dropdownYears"
              value={`${yoeoption[0]}-${yoeoption[1]}`}
              onChange={(e) =>
                setYoeOption([e.target.value[0], e.target.value[1]])
              }
            >
              <option key="" value="">
                Years of Experience (Any)
              </option>
              <option key="05" value="0005">
                0-5
              </option>
              <option key="510" value="0510">
                5-10
              </option>
              <option key="1015" value="1015">
                10-15
              </option>
              <option key="1520" value="1520">
                15-20
              </option>
            </Form.Select>
          </Form.Group>
        </Collapse>
      </Form>
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
      <LoadingSpinner display={isLoading} />
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
  font-display: swap;
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
`;

const PageBanner = styled.div`
  height: 255px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;
`;

const BannerHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;
