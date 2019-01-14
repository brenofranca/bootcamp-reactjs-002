import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;

  display: flex;
  flex-direction: column;
  margin: 0px 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }
    strong {
      font-size: 24px;
      margin: 10px;
    }
    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
        margin-left: 5px;
      }

      button {
        border: 0;
        border-radius: 3px;
        color: #fff;
        height: 40px;
        font-size: 14px;
        font-weight: bold;
        width: 100%;

        &.remove {
          background: #c15555;

          &:hover {
            background: #ad0404;
          }
        }

        &.update {
          background: #5db55d;
          margin-top: 5px;

          &:hover {
            background: #449044;
          }
        }
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }

      &:last-child {
        padding: 10px;
      }
    }
  }
`;
