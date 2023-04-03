import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Sector = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  p {
    margin: 0
  }

  &.Informations {
    padding: 0 10px;
    background-color: #FFFFFF;
  }
  
  &.Redirects {
    padding: 40px 10px;
    background-color: #F1B759;
  }
  
  &.Presentation {
    padding: 0 10px;
    background-color: #59487A;
    padding-bottom: 40px !important;
  }
`;

export const Content = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 10px 0;
  
  &.flex {
    display: flex;
    width: 1000px;
  }
`;

export const InformationsTitle = styled.p`
  font-weight: 900;
  font-size: 28px;
  line-height: 58px;
  display: flex;
  align-items: center;
  color: #F1B759;
  text-shadow: 3px 2px 0px #59487A;
`;

export const MoreInfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`;

export const MoreInfoButtom = styled.button`
  width: 185px;
  height: 40px;
  font-weight: 500;
  font-size: 18px;

  border: none;
  color: #59487A;
  background: #F1B759;
  box-shadow: 3px 2px 0px #59487A;
  border-radius: 10px;
`;

export const Box = styled.div`
  background-color: #59487A;
  border-radius: 10px;
  margin: 15px 0px;
  padding: 20px;
`;

export const InformationsDescription = styled.p`
  font-weight: 300;
  font-size: 18px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #59487A;
  margin-bottom: 30px !important;
`;

export const Topic = styled.div`
  display: flex;
  align-items: center;

  p {
    font-weight: 700;
    font-size: 24px;
    line-height: 43px;
    color: #F1B759;
  }
`;

export const TopicDescription = styled.p`
  padding: 0 6px;
  font-size: 18px;
  line-height: 100%;
  color: #FFFFFF;

  b {
    font-weight: 700;
  }
`;

export const Side = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-weight: 900;
    font-size: 28px;
    line-height: 58px;
    color: #59487A;
    text-shadow: 3px 2px 0px #FFFFFF;
  }

  @keyframes hoverIn {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-10px);
    }
  }

  @keyframes hoverOut {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  img {
    cursor: pointer;

    :hover {
      animation-name: hoverIn;
      animation-duration: 0.15s;
      animation-timing-function: linear;
      transform: translateY(-10px);
    }
    animation-name: hoverOut;
    animation-duration: 0.15s;
    animation-timing-function: linear;
    transform: translateY(0px);
  }
`;

export const PresentationTitle = styled.p`
  font-weight: 900;
  font-size: 28px;
  line-height: 58px;
  color: #F1B759;
  margin-bottom: 20px !important;
  text-shadow: 3px 2px 0px #FFFFFF;
`;

export const PresentationContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PresentationLeft = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 180px;

  img {
    margin-bottom: 15px;
  }
`;

export const PresentationRight = styled.div`
  width: 75%;

  p {
    text-indent: 1.5em;
  }
`;

export const PresentationName = styled.p`
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #FFFFFF;
`;

export const PresentationRole = styled.p`
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #F1B759;
`;
export const PresentationLinks = styled.div`
  display: flex;
  gap: 15px;

  img {
    cursor: pointer;
  }
`;

