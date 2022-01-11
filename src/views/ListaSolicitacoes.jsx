import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listaSolicitacoes } from '../actions/GamesAction';

export default function ListaSolicitacoes() {
  const game = useSelector((state) => state.game);
  const [solicitacoes, setSolicitacoes] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    listaSolicitacoes(dispatch);
  }, [dispatch]);
  useEffect(() => {
    setSolicitacoes(game.lista);
  }, [game]);
  return (
    <div>
      <ul>{solicitacoes && solicitacoes.map((item) => <li>{item.id}</li>)}</ul>
    </div>
  );
}
