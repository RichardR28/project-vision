import React, { useState } from 'react';
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

export default function Menu(props) {
  const [controlador, setControlador] = useState({
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
  });

  function handleDropdown() {
    setControlador((prev) => {
      return { ...prev, drop: !prev.drop };
    });
  }

  function handleDrawer() {
    setControlador((prev) => {
      return { ...prev, draw: !prev.draw };
    });
  }

  function setBackgroundColorOnEnter(bgColor, location) {
    const auxItens = controlador.itens;
    auxItens[location] = { color: 'white', background: bgColor };
    setControlador((prev) => {
      return { ...prev, itens: auxItens };
    });
  }

  function setBackgroundColorOnLeave(location) {
    const auxItens = controlador.itens;
    auxItens[location] = { color: 'black', background: 'white' };
    setControlador((prev) => {
      return { ...prev, itens: auxItens };
    });
  }

  const { drop, draw, itens } = controlador;
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
          <IconButton onClick={() => handleDrawer()}>
            <Icon style={{ color: 'white' }} path={mdiMenu} size={1.2} />
          </IconButton>
          <div>MENU</div>
        </div>
        <IconButton
          id="profile"
          aria-controls="dropdown"
          onClick={() => handleDropdown()}
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
                  onClick={() => handleDropdown()}
                >
                  <Link to="/">Minha Conta</Link>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/"
                  onClick={() => handleDropdown()}
                >
                  <Link to="/">Logout</Link>
                </MenuItem>
              </div>
            ) : (
              <MenuItem
                component={Link}
                to="/login"
                onClick={() => handleDropdown()}
              >
                Login
              </MenuItem>
            )}
          </Dropdown>
        </IconButton>
      </div>
      <Drawer anchor="left" open={draw} onClose={() => handleDrawer()}>
        <List className="dropdownList" style={{ width: 250 }}>
          <ListItem style={itens && itens['game'] ? itens['game'] : {}}>
            <div
              className="drawerItem"
              onMouseEnter={() =>
                setBackgroundColorOnEnter('rgb(255 0 0 / 31%)', 'game')
              }
              onMouseLeave={() => setBackgroundColorOnLeave('game')}
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
                setBackgroundColorOnEnter('#00800061', 'quiz')
              }
              onMouseLeave={() => setBackgroundColorOnLeave('quiz')}
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
