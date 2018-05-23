import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imgLogo from '../../assets/Logo-white.svg';

import styled from 'styled-components';

class Footer extends Component {
  render() {
    return (
      <FooterWrap>
        <Container>
          <FooterTitle>
            Сделано с любовью и старанием <br />
            на курсе «React.js» в{' '}
            <a href="https://loftschool.com">
              <b>LoftSchool</b>
            </a>.<br />
            Автор работы: <b>Контарева Анна</b>
          </FooterTitle>
          <nav>
            <ul>
              <li>
                <Link to={`/`}>Главная</Link>
              </li>
              <li>
                <Link to={`/feeds`}>Лента</Link>
              </li>
              <li>
                <Link to={`/trade`}>Торги</Link>
              </li>
              <li>
                <Link to={`/profile/:login`}>Профиль</Link>
              </li>
            </ul>
          </nav>
          <Link to="/">
            <Logo src={imgLogo} alt="logo-footer" />
          </Link>
        </Container>
      </FooterWrap>
    );
  }
}

export default Footer;

//#region styles

const Logo = styled.img`
  width: 140px;
  height: 80px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 1240px;
`;

const FooterWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 100px;
  background-color: #1e2021;

  nav {
    ul {
      display: flex;
      justify-content: center;
      min-width: 800px;
      list-style: none;
      font-size: 18px;
      color: #ffffff;

      li {
        position: relative;
        display: block;
        margin-right: 20px;
        float: left;

        a {
          text-decoration: none;
          color: #ffffff;
        }
      }
    }
  }
`;

const FooterTitle = styled.div`
  width: 250px;
  padding: 20px;
  font-size: 14px;
  color: #ffffff;
  a {
    text-decoration: none;
    color: #ffffff;
  }
`;

//#endregion
