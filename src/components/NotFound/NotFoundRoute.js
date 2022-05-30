import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundRoute = () => {
  return (
    <>
      <PageContainer>
        <PageBanner>
          <BannerHeader>Page Not Found</BannerHeader>
          <BannerPara>
            Oops! It looks like you're lost. Try heading back to the
            <Link to="/" style={{ color: "#6eb950" }}>
              {" "}
              homepage
            </Link>
            .
          </BannerPara>
        </PageBanner>
      </PageContainer>
    </>
  );
};

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

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;

const PageContainer = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  height: 65vh;
`;

export default NotFoundRoute;
