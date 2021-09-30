import React from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'; 

//import BlogLayout from './components/BlogLayout';
import BlogPostCreate from './components/blogPostCRUD/BlogPostCreate';
import BlogPostSearch from './components/blogPostCRUD/BlogPostSearch';

import {Layout, Menu, Breadcrumb} from 'antd'

import './styles/css/globalStyles.css';
import 'antd/dist/antd.css'

const { Header, Footer, Content } = Layout

function App(): JSX.Element {

  

  return (
    <Router>
      <Layout>
            <Header>
              <div className="logo" />
                  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                  {/*
                  {new Array(15).fill(null).map((_, index) => {
                  const key = index + 1;
                  return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                  })} 
                  */}
                  <Menu.Item ><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item ><Link to="/blogPostSearch">Search</Link></Menu.Item>
                  <Menu.Item ><Link to="/blogPostCreate">Create</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              
              <Route exact path="/blogPostCreate" component={BlogPostCreate} />
              <Route exact path="/blogPostSearch" component={BlogPostSearch} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      
    </Router>

  );
}

export default App;
