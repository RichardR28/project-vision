import React, { useState, useEffect } from 'react';
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
import {
  mdiMenu,
  mdiAccountCircle,
  mdiForum,
  mdiGamepadSquare,
  mdiMessagePlus,
  mdiPlusBoxMultiple,
  mdiListStatus,
  mdiAccountDetails,
  mdiHistory,
  mdiStarFace,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/UserActions';
import { adminUsers } from '../res/adminUsers';
const _ = require('lodash');

export default function Menu(props) {
  const user = useSelector((state) => state.user);
  const localUser = localStorage.getItem('loggedUser')
    ? JSON.parse(localStorage.getItem('loggedUser'))
    : null;

  const isAuthenticated = user?.name || localUser?.name ? true : false;
  const isCreator = user?.creator === 1 || localUser?.creator === 1;
  const username = user?.username || localUser?.username;
  const isAdmin = _.indexOf(adminUsers, username) >= 0 ? true : false;

  useEffect(() => {
    setControlador({
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
        createGame: {
          color: 'black',
          background: 'transparent',
          display: isCreator ? 'visible' : 'none',
        },
        minhasSolicitacoes: {
          color: 'black',
          background: 'transparent',
          display: isCreator ? 'visible' : 'none',
        },
        createQuiz: {
          color: 'black',
          background: 'transparent',
          display: isCreator ? 'visible' : 'none',
        },
        meusQuizzes: {
          color: 'black',
          background: 'transparent',
          display: isCreator ? 'visible' : 'none',
        },
        meusResultados: {
          color: 'black',
          background: 'transparent',
          display: isAuthenticated ? 'visible' : 'none',
        },
        minhasPontuacoes: {
          color: 'black',
          background: 'transparent',
          display: isAuthenticated ? 'visible' : 'none',
        },
        listaSolicitacoes: {
          color: 'black',
          background: 'transparent',
          display: isAdmin ? 'visible' : 'none',
        },
      },
    });
  }, [isAdmin, isAuthenticated, isCreator, user]);

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
      createGame: {
        color: 'black',
        background: 'transparent',
        display: isCreator ? 'visible' : 'none',
      },
      minhasSolicitacoes: {
        color: 'black',
        background: 'transparent',
        display: isCreator ? 'visible' : 'none',
      },
      createQuiz: {
        color: 'black',
        background: 'transparent',
        display: isCreator ? 'visible' : 'none',
      },
      meusQuizzes: {
        color: 'black',
        background: 'transparent',
        display: isCreator ? 'visible' : 'none',
      },
      meusResultados: {
        color: 'black',
        background: 'transparent',
        display: isAuthenticated ? 'visible' : 'none',
      },
      minhasPontuacoes: {
        color: 'black',
        background: 'transparent',
        display: isAuthenticated ? 'visible' : 'none',
      },
      listaSolicitacoes: {
        color: 'black',
        background: 'transparent',
        display: isAdmin ? 'visible' : 'none',
      },
    },
  });

  const dispatch = useDispatch();
  const history = useHistory();

  function handleDropdown() {
    setControlador((prev) => {
      return { ...prev, drop: !drop };
    });
  }

  function handleDrawer() {
    setControlador((prev) => {
      return {
        ...prev,
        draw: !prev.draw,
        itens: {
          game: {
            color: 'black',
            background: 'transparent',
          },
          quiz: {
            color: 'black',
            background: 'transparent',
          },
          createGame: {
            color: 'black',
            background: 'transparent',
            display: isCreator ? 'visible' : 'none',
          },
          minhasSolicitacoes: {
            color: 'black',
            background: 'transparent',
            display: isCreator ? 'visible' : 'none',
          },
          createQuiz: {
            color: 'black',
            background: 'transparent',
            display: isCreator ? 'visible' : 'none',
          },
          meusQuizzes: {
            color: 'black',
            background: 'transparent',
            display: isCreator ? 'visible' : 'none',
          },
          meusResultados: {
            color: 'black',
            background: 'transparent',
            display: isAuthenticated ? 'visible' : 'none',
          },
          minhasPontuacoes: {
            color: 'black',
            background: 'transparent',
            display: isAuthenticated ? 'visible' : 'none',
          },
          listaSolicitacoes: {
            color: 'black',
            background: 'transparent',
            display: isAdmin ? 'visible' : 'none',
          },
        },
      };
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

  function logoutUser() {
    logout(dispatch);
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
                  to="/minhaConta"
                  onClick={() => handleDropdown()}
                >
                  Minha Conta
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/"
                  onClick={() => {
                    logoutUser();
                    handleDropdown();
                  }}
                >
                  Logout
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
      <Drawer
        anchor="left"
        style={{ zIndex: 999999 }}
        open={draw}
        onClose={() => handleDrawer()}
      >
        <List className="dropdownList" style={{ width: 250 }}>
          <ListItem
            onClick={() => {
              history.push('/listaJogos');
              handleDrawer();
            }}
            style={itens && itens['game'] ? itens['game'] : {}}
          >
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
          <ListItem
            onClick={() => {
              history.push('/criarJogo');
              handleDrawer();
            }}
            style={itens && itens['createGame'] ? itens['createGame'] : {}}
          >
            <div
              className="drawerItem"
              onMouseEnter={() => {
                setBackgroundColorOnEnter('rgb(255 0 0 / 31%)', 'createGame');
              }}
              onMouseLeave={() => setBackgroundColorOnLeave('createGame')}
            >
              <ListItemIcon>
                <Icon
                  style={{ color: 'red' }}
                  path={mdiPlusBoxMultiple}
                  size={1.5}
                ></Icon>
              </ListItemIcon>
              <div>Solicitar Novo Jogo</div>
            </div>
          </ListItem>
          <ListItem
            onClick={() => {
              history.push('/minhasSolicitacoes');
              handleDrawer();
            }}
            style={
              itens && itens['minhasSolicitacoes']
                ? itens['minhasSolicitacoes']
                : {}
            }
          >
            <div
              className="drawerItem"
              onMouseEnter={() => {
                setBackgroundColorOnEnter(
                  'rgb(255 0 0 / 31%)',
                  'minhasSolicitacoes',
                );
              }}
              onMouseLeave={() =>
                setBackgroundColorOnLeave('minhasSolicitacoes')
              }
            >
              <ListItemIcon>
                <Icon
                  style={{ color: 'red' }}
                  path={mdiListStatus}
                  size={1.5}
                ></Icon>
              </ListItemIcon>
              <div>Minhas Solicitações</div>
            </div>
          </ListItem>
          <ListItem
            onClick={() => {
              history.push('/pontuacoes');
              handleDrawer();
            }}
            style={
              itens && itens['minhasPontuacoes']
                ? itens['minhasPontuacoes']
                : {}
            }
          >
            <div
              className="drawerItem"
              onMouseEnter={() => {
                setBackgroundColorOnEnter(
                  'rgb(255 0 0 / 31%)',
                  'minhasPontuacoes',
                );
              }}
              onMouseLeave={() => setBackgroundColorOnLeave('minhasPontuacoes')}
            >
              <ListItemIcon>
                <Icon
                  style={{ color: 'red' }}
                  path={mdiStarFace}
                  size={1.5}
                ></Icon>
              </ListItemIcon>
              <div>Minhas Pontuações</div>
            </div>
          </ListItem>
          <ListItem
            onClick={() => {
              history.push('/listaQuizzes');
              handleDrawer();
            }}
            style={itens && itens['quiz'] ? itens['quiz'] : {}}
          >
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
          <ListItem
            onClick={() => {
              history.push('/criarQuiz');
              handleDrawer();
            }}
            style={itens && itens['createQuiz'] ? itens['createQuiz'] : {}}
          >
            <div
              className="drawerItem"
              onMouseEnter={() => {
                setBackgroundColorOnEnter('#00800061', 'createQuiz');
              }}
              onMouseLeave={() => {
                setBackgroundColorOnLeave('createQuiz');
              }}
            >
              <ListItemIcon>
                <Icon
                  style={{ color: 'green' }}
                  path={mdiMessagePlus}
                  size={1.5}
                ></Icon>
              </ListItemIcon>
              <div>Criar Quizz</div>
            </div>
          </ListItem>
          <ListItem
            onClick={() => {
              history.push('/meusQuizzes');
              handleDrawer();
            }}
            style={itens && itens['meusQuizzes'] ? itens['meusQuizzes'] : {}}
          >
            <div
              className="drawerItem"
              onMouseEnter={() => {
                setBackgroundColorOnEnter('#00800061', 'meusQuizzes');
              }}
              onMouseLeave={() => {
                setBackgroundColorOnLeave('meusQuizzes');
              }}
            >
              <ListItemIcon>
                <Icon
                  style={{ color: 'green' }}
                  path={mdiAccountDetails}
                  size={1.5}
                ></Icon>
              </ListItemIcon>
              <div>Meus Quizzes</div>
            </div>
          </ListItem>
          <ListItem
            onClick={() => {
              history.push('/resultados');
              handleDrawer();
            }}
            style={
              itens && itens['meusResultados'] ? itens['meusResultados'] : {}
            }
          >
            <div
              className="drawerItem"
              onMouseEnter={() => {
                setBackgroundColorOnEnter('#00800061', 'meusResultados');
              }}
              onMouseLeave={() => {
                setBackgroundColorOnLeave('meusResultados');
              }}
            >
              <ListItemIcon>
                <Icon
                  style={{ color: 'green' }}
                  path={mdiHistory}
                  size={1.5}
                ></Icon>
              </ListItemIcon>
              <div>Meus Resultados</div>
            </div>
          </ListItem>
          <ListItem
            onClick={() => {
              history.push('/listaSolicitacoes');
              handleDrawer();
            }}
            style={
              itens && itens['listaSolicitacoes']
                ? itens['listaSolicitacoes']
                : {}
            }
          >
            <div
              className="drawerItem"
              onMouseEnter={() => {
                setBackgroundColorOnEnter('#0000ff7a', 'listaSolicitacoes');
              }}
              onMouseLeave={() => {
                setBackgroundColorOnLeave('listaSolicitacoes');
              }}
            >
              <ListItemIcon>
                <Icon
                  style={{ color: 'blue' }}
                  path={mdiMessagePlus}
                  size={1.5}
                ></Icon>
              </ListItemIcon>
              <div>Lista de Solicitações</div>
            </div>
          </ListItem>
        </List>
      </Drawer>
    </Paper>
  );
}
