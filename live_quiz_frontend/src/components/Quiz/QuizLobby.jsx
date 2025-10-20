import React from 'react';
import Container from '../Layout/Container';
import { listQuizzes, joinQuiz } from '../../mocks/mockApi';
import { saveSession, loadSession } from '../../utils/storage';
import { ROUTES } from '../../routes';

// PUBLIC_INTERFACE
export default function QuizLobby({ navigate }) {
  /** Lobby lists available quizzes and allows joining with a name */
  const [quizzes, setQuizzes] = React.useState([]);
  const [name, setName] = React.useState(loadSession()?.name || '');
  const [selectedQuiz, setSelectedQuiz] = React.useState(loadSession()?.quizId || '');

  React.useEffect(() => {
    let alive = true;
    listQuizzes().then(q => alive && setQuizzes(q));
    return () => { alive = false; };
  }, []);

  const handleJoin = async () => {
    if (!name || !selectedQuiz) return;
    const userId = `u_${Math.random().toString(36).slice(2,8)}`;
    await joinQuiz({ quizId: selectedQuiz, name, userId });
    saveSession({ name, quizId: selectedQuiz, userId });
    navigate(ROUTES.play);
  };

  return (
    <Container title="Lobby" actions={null}>
      <div style={{display:'grid', gap:16}}>
        <div className="card" style={{padding:16}}>
          <div style={{display:'grid', gap:8}}>
            <label>
              <div style={{fontSize:12, color:'var(--muted)'}}>Your name</div>
              <input className="input" placeholder="Enter your display name" value={name} onChange={e=>setName(e.target.value)} />
            </label>
            <label>
              <div style={{fontSize:12, color:'var(--muted)'}}>Select a quiz</div>
              <select className="input" value={selectedQuiz} onChange={e=>setSelectedQuiz(e.target.value)} aria-label="Select quiz">
                <option value="">Choose...</option>
                {quizzes.map(q => (
                  <option key={q.id} value={q.id}>{q.title} • {q.questionCount} questions</option>
                ))}
              </select>
            </label>
            <div>
              <button className="btn-primary" onClick={handleJoin} aria-label="Join selected quiz">Join Quiz</button>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{marginBottom:8}}>Available Quizzes</h3>
          <div style={{display:'grid', gap:12}}>
            {quizzes.map(q => (
              <div key={q.id} className="card" style={{padding:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:600}}>{q.title}</div>
                  <div style={{color:'var(--muted)'}}>{q.description}</div>
                </div>
                <button className="btn-ghost" onClick={()=>setSelectedQuiz(q.id)} aria-label={`Select ${q.title}`}>Select</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
