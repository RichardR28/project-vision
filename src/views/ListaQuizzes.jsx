import React from 'react';

import { Card, CardActions, CardContent } from '@material-ui/core';
import quiz from '../res/imagens/quiz.png';

export default function ListaQuizzes() {
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
    <div className="listQuizzes">
      {preview &&
        preview.map((item) => {
          return (
            <Card key={item.id} className="listQuizzesItem">
              <div className="cardHeader">{item.id}</div>
              <CardContent className="cardContent">
                <img src={quiz} alt="game" />
              </CardContent>
              <CardActions className="cardActions">
                <button className="play">Fazer</button>
                <button className="info">Informação</button>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
}
