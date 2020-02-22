import styled from 'styled-components';

export const Container = styled.div`
  .show {
    display: block !important;
  }
  .hide {
    display: none !important;
  }
  .search-bar {
    width: 40%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    border-radius: 25px;
    .search-div-icon {
      min-width: 35px;
      min-height: 35px;
      border-radius: 0 25px 25px 0;
      background: rgb(179, 195, 239);
      align-self: center;
      color: darkblue;
      svg {
        margin-top: 18%;
        margin-right: 25%;
        font-size: 23px;
      }
    }
    .search-strings-information {
      font-size: 12px;
      color: darkblue;
      text-align: center;
      border-bottom: 1px solid silver;
      background: lightblue;
      border-radius: 5px;
      user-select: none;
    }
    .search-data-list {
      z-index: 2;
      position: absolute;
      top: 69px;
      background: white;
      min-width: 17vw;
      border-radius: 5px;
      box-shadow: 1px 3px 6px 0px #00000054;
      max-height: 50vh;
      overflow-x: auto;
      .title {
        background: #f3f1f1;
        padding: 6px;
        user-select: none;
        font-size: 14px;
        margin: 0px;
        text-align: left;
        text-transform: uppercase;
        font-weight: bold;
        color: darkblue;
      }
      .no-results {
        margin: 0px;
        text-align: center;
        color: #a00000;
        font-size: 14px;
      }
      .search-preview {
        display: none;
      }
      .search-title {
        width: 50%;
      }
      li {
        user-select: none;
        display: inherit;
        text-align: left;
        padding: 5px 9px;
        font-size: 13px;
        cursor: pointer;
        color: darkblue;
        :hover {
          background: lightblue;
          .search-title span {
            font-weight: bold;
          }
          .search-duration {
            display: block;
          }
          .search-preview {
            width: 50%;
            display: block;
            width: 50%;
            text-align-last: end;
            img {
              width: 110px;
              border: 2px solid #f3f1f1;
              border-radius: 5px;
            }
          }
        }
      }
      :hover {
        display: block;
      }
    }
  }
`;
