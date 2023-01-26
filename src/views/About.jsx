import * as style from '../styles/About.style';
import AboutEye from '../res/imagens/about.png';
import quizzLogo from '../res/imagens/quizzLogo.png';
import jogosLogo from '../res/imagens/jogosLogo.png';
import perfil from '../res/imagens/perfil.png';
import githubIcon from '../res/imagens/githubIcon.png';
import linkedinIcon from '../res/imagens/linkedinIcon.png';
import Icon from '@mdi/react';
import { mdiChevronDoubleRight } from '@mdi/js';
import { useHistory } from 'react-router-dom';


export default function About() {
  const history = useHistory()
  return (
    <style.Container>
      <style.Sector>
        <img
          width='100%'
          src={AboutEye}
          alt="Logo"
        />
      </style.Sector>
      <style.Sector className='Informations'><style.Content>
        <style.InformationsTitle>
          DALTONISMO
        </style.InformationsTitle>
        <style.InformationsDescription>
          A discromatopsia, ou daltonismo como é mais comumente conhecida, é uma deficiência visual caracterizada pela incapacidade de distinguir algumas tonalidades de cores, ou todas elas, em casos mais raros. Acredita-se hoje que o percentual de portadores dessa deficiência possa chegar a 8% da população mundial.
        </style.InformationsDescription>
        <style.MoreInfoBox>
          <style.MoreInfoButtom type='buttom'>Mais informações</style.MoreInfoButtom>
        </style.MoreInfoBox>
        <style.Box>
          <style.Topic>
            <Icon path={mdiChevronDoubleRight} color="#F1B759" style={{ fontWeight: 700 }} size={1.2} />
            <p>Soluções</p>
          </style.Topic>
          <style.TopicDescription>
            Procuramos fornecer um método simples e rápido para identificar em nossos usuários possíveis problemas voltados, inicialmente, em alterações visuais.
          </style.TopicDescription>
          <style.Topic style={{ marginTop: 20 }}>
            <Icon path={mdiChevronDoubleRight} color="#F1B759" style={{ fontWeight: 700 }} size={1.2} />
            <p>Como Fazemos</p>
          </style.Topic>
          <style.TopicDescription>
            Pretendemos cumprir essa tarefa de maneira que adeque todas as faixas etárias e necessidades pessoais, ou seja, se não tem muito tempo pode optar pelo <b>Quizz</b>, que são perguntas objetivas e de resposta simples para obter um resultado mais rapidamente. Já se não gosta desse formato de perguntas e respostas e quer algo mais interativo, temos alguns <b>Jogos</b> para deixar tudo mais leve e casual.
          </style.TopicDescription>
        </style.Box>
      </style.Content></style.Sector>
      <style.Sector className='Redirects'>
        <style.Content className='flex'>
          <style.Side>
            <img
              width="80%"
              onClick={() => history.push('/listaQuizzes')}
              style={{ maxWidth: 250 }}
              src={quizzLogo}
              alt="quizzLogo"
            />
            <p>QUIZZES</p>
          </style.Side>
          <style.Side>
            <img
              width="80%"
              onClick={() => history.push('/listaJogos')}
              style={{ maxWidth: 250 }}
              src={jogosLogo}
              alt="jogosLogo"
            />
            <p>JOGOS</p>
          </style.Side>
        </style.Content>
      </style.Sector>
      <style.Sector className='Presentation'>
        <style.Content>
          <style.PresentationTitle>
            QUEM SOU
          </style.PresentationTitle>
          <style.PresentationContent>
            <style.PresentationLeft>
              <img
                width={150}
                src={perfil}
                alt="perfil"
              />
              <style.PresentationName>Richard Alves Roling</style.PresentationName>
              <style.PresentationRole>Desenvolvedor Frot-end</style.PresentationRole>
              <style.PresentationLinks>
                <img
                  width={32}
                  src={linkedinIcon}
                  onClick={() => window.open('https://www.linkedin.com/in/richardalvesroling/', '__blank')}
                  alt="linkedin"
                />
                <img
                  width={32}
                  src={githubIcon}
                  onClick={() => window.open('https://github.com/RichardR28', '__blank')}
                  alt="github"
                />
              </style.PresentationLinks>
            </style.PresentationLeft>
            <style.PresentationRight>
              <p>
                Este projeto foi desenvolvido como parte do Trabalho de Conclusão de Curso, para a obtenção do grau de bacharel em Sistemas de Informação do Instituto Federal Catarinense e visa simplificar as interações entre plataforma e usuário, tornando os processos de identificação e triagem de daltonismo mais inclusivos à crianças, desde a fase inicial escolar, mas também adultos que possam vir a ter dificuldades quanto a realização de testes ou avaliações com um nível de complexidade mais elevado.
              </p>
              <br />
              <p>
                O resultado dos testes realizados neste site não é um diagnostico e não substitui o conselho médico de um profissional da área. Este site é informacional e somente para propósito educativo.
              </p>
            </style.PresentationRight>
          </style.PresentationContent>
        </style.Content>
      </style.Sector>
    </style.Container>
  );
}