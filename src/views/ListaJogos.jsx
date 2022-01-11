import React from 'react';

import { Card, CardActions, CardContent } from '@material-ui/core';
import jogo from '../res/imagens/jogo.png';

export default function ListaJogos() {
  const preview = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  return (
    <div className="listJogos">
      {preview &&
        preview.map((item) => {
          return (
            <Card key={item.id} className="listJogosItem">
              <div className="cardHeader">{item.id}</div>
              <CardContent className="cardContent">
                <img src={jogo} alt="game" />
              </CardContent>
              <CardActions className="cardActions">
                <button className="play">Jogar</button>
                <button className="info">Informação</button>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
}
