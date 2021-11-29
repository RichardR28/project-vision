import React, { Component } from 'react';
import {
  IconButton,
  Paper,
  Menu as Dropdown,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import { mdiMenu, mdiAccountCircle, mdiForum, mdiGamepadSquare } from '@mdi/js';
import Icon from '@mdi/react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drop: false,
      draw: false,
      itens: {
        game: {
          color: 'black',
          background: 'transparent',
        },
        quiz: {
          color: 'black',
          background: 'transparent',
        },
      },
    };
  }

  handleDropdown = () => {
    this.setState({ drop: !this.state.drop });
  };

  handleDrawer = () => {
    this.setState({ draw: !this.state.draw });
  };

  setBackgroundColorOnEnter = (bgColor, location) => {
    const auxItens = this.state.itens;
    auxItens[location] = { color: 'white', background: bgColor };
    this.setState({ itens: auxItens });
  };

  setBackgroundColorOnLeave = (location) => {
    const auxItens = this.state.itens;
    auxItens[location] = { color: 'black', background: 'white' };
    this.setState({ itens: auxItens });
  };

  render() {
    const { drop, draw, itens } = this.state;
    return (
      <Paper
        elevation={3}
        square
        style={{
          height: 50,
          width: '100%',
          background: 'rgb(89 72 122)',
          fontSize: 18,
          color: 'white',
          border: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            padding: '0 10px',
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 100,
              justifyContent: 'space-between',
            }}
          >
            <IconButton onClick={() => this.handleDrawer()}>
              <Icon style={{ color: 'white' }} path={mdiMenu} size={1.2} />
            </IconButton>
            <div>MENU</div>
          </div>
          <IconButton
            id="profile"
            aria-controls="dropdown"
            onClick={() => this.handleDropdown()}
          >
            <Icon
              style={{ color: 'white' }}
              title="Fazer Login"
              path={mdiAccountCircle}
              size={1.2}
            />
            <Dropdown
              id="dropdown"
              style={{ marginTop: 35 }}
              anchorEl={document.getElementById('profile')}
              keepMounted
              open={drop}
            >
              {isAuthenticated ? (
                <div>
                  <MenuItem
                    component={Link}
                    to="/"
                    onClick={() => this.handleDropdown()}
                  >
                    <Link to="/">Minha Conta</Link>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/"
                    onClick={() => this.handleDropdown()}
                  >
                    <Link to="/">Logout</Link>
                  </MenuItem>
                </div>
              ) : (
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={() => this.handleDropdown()}
                >
                  Login
                </MenuItem>
              )}
            </Dropdown>
          </IconButton>
        </div>
        <Drawer anchor="left" open={draw} onClose={() => this.handleDrawer()}>
          <List className="dropdownList" style={{ width: 250 }}>
            <ListItem style={itens && itens['game'] ? itens['game'] : {}}>
              <div
                className="drawerItem"
                onMouseEnter={() =>
                  this.setBackgroundColorOnEnter('rgb(255 0 0 / 31%)', 'game')
                }
                onMouseLeave={() => this.setBackgroundColorOnLeave('game')}
              >
                <ListItemIcon>
                  <Icon
                    style={{ color: 'red' }}
                    path={mdiGamepadSquare}
                    size={1.5}
                  />
                </ListItemIcon>
                <div>Jogos</div>
              </div>
            </ListItem>
            <ListItem style={itens && itens['quiz'] ? itens['quiz'] : {}}>
              <div
                className="drawerItem"
                onMouseEnter={() =>
                  this.setBackgroundColorOnEnter('#00800061', 'quiz')
                }
                onMouseLeave={() => this.setBackgroundColorOnLeave('quiz')}
              >
                <ListItemIcon>
                  <Icon style={{ color: 'green' }} path={mdiForum} size={1.5} />
                </ListItemIcon>
                <div>Quizzes</div>
              </div>
            </ListItem>
          </List>
        </Drawer>
      </Paper>
    );
  }
}
