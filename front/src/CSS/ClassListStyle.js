import styled from 'styled-components';

export const HomeClassListContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height || '260px'};
  padding: 3%;
  border-radius: 3px;
  border: 1px solid rgb(200, 200, 200);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;

export const ListtHumbnail = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: ${(props) => props.width || '40%'};
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  order: ${(props) => props.order || '0'};
`;

export const ListInfoWrap = styled.div`
  width: ${(props) => props.width || '46%'};
  margin-left: ${(props) => props.ml || '-12px'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${(props) => props.al || 'auto'};
  order: ${(props) => props.order || '0'};
`;

export const InfoMember = styled.div`
  font-size: 14px;
  display: flex;
  order: ${(props) => props.order || '0'};
`;

export const InfoCounter = styled.div`
  margin-left: 2px;
`;

export const InfoMainTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
`;

export const InfoSubTitle = styled.div`
  line-height: 1.5;
  font-size: 14px;
  height: ${(props) => props.height || '90px'};
  text-align: ${(props) => props.ta || 'auto'};
`;

export const InfoHasTagWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoMainHasTag = styled.span`
  margin-right: 10px;
  font-size: 12px;
  background: #db7093;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
`;

export const InfoHasTag = styled.span`
  margin-right: 10px;
  font-size: 12px;
  color: black;
  cursor: pointer;
  border-radius: 3px;

  &: last-child {
    margin-right: 0;
  }
`;

export const InfoLocation = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: ${(props) => props.mb || '0'};
`;

export const InfoLocationWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(220, 220, 220);
  width: 64px;
  padding: 8px 6px;
  font-size: 13px;
  border-radius: 6px;
`;
