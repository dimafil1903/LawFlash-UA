import React from 'react';
import { ChevronLeft } from 'lucide-react';

export const Algorithm = ({ navigate }) => {
  return (
    <div className="screen">
      <div className="nav-bar">
        <div className="nav-left">
          <button onClick={() => navigate('Stats')} style={{display: 'flex', alignItems: 'center'}}>
            <ChevronLeft size={24} /> <span style={{marginLeft: 4}}>Статистика</span>
          </button>
        </div>
        <span className="nav-title">Алгоритм</span>
      </div>

      <div className="content-scroll" style={{ padding: '20px' }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Як працює навчання?</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 15 }}>
          LawFlash використовує алгоритм інтервального повторення (Spaced Repetition),
          адаптований для підготовки до іспитів.
        </p>

        {/* Section 1 */}
        <div style={sectionStyle}>
          <div style={iconWrap}>
            <span style={emojiStyle}>1</span>
          </div>
          <h3 style={h3Style}>Свайп як оцінка</h3>
          <p style={pStyle}>
            Коли ви бачите питання і відповідь на картці, ви оцінюєте себе свайпом:
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <div style={{ ...chipStyle, borderColor: 'var(--success)' }}>
              <span style={{ fontWeight: 700 }}>Вправо</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>= Знав</span>
            </div>
            <div style={{ ...chipStyle, borderColor: 'var(--danger)' }}>
              <span style={{ fontWeight: 700 }}>Вліво</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>= Повторити</span>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div style={sectionStyle}>
          <div style={iconWrap}>
            <span style={emojiStyle}>2</span>
          </div>
          <h3 style={h3Style}>Інтервали зростають</h3>
          <p style={pStyle}>
            Якщо ви відповідаєте правильно, інтервал до наступного показу картки збільшується:
          </p>
          <div style={timelineStyle}>
            <TimelineStep label="1-й раз правильно" interval="1 день" />
            <TimelineStep label="2-й раз правильно" interval="4 дні" />
            <TimelineStep label="3-й раз правильно" interval="~8 днів" />
            <TimelineStep label="Далі" interval="Множиться на коефіцієнт" isLast />
          </div>
        </div>

        {/* Section 3 */}
        <div style={sectionStyle}>
          <div style={iconWrap}>
            <span style={emojiStyle}>3</span>
          </div>
          <h3 style={h3Style}>Помилки скидають прогрес</h3>
          <p style={pStyle}>
            Якщо ви свайпнули вліво ("Повторити"), інтервал скидається до 1 дня, і картка
            з'явиться знову завтра. Це гарантує, що складні питання повторюються частіше.
          </p>
          <div style={highlightBox}>
            Картки з 3+ помилками позначаються як "Важкі" у статистиці.
          </div>
        </div>

        {/* Section 4 */}
        <div style={sectionStyle}>
          <div style={iconWrap}>
            <span style={emojiStyle}>4</span>
          </div>
          <h3 style={h3Style}>Коефіцієнт легкості (Ease)</h3>
          <p style={pStyle}>
            Кожна картка має свій коефіцієнт (від 1.3 до 2.5).
            Правильні відповіді підвищують його, помилки — знижують.
            Це означає, що легкі для вас питання з часом показуються рідше,
            а складні — частіше.
          </p>
        </div>

        {/* Section 5 */}
        <div style={sectionStyle}>
          <div style={iconWrap}>
            <span style={emojiStyle}>5</span>
          </div>
          <h3 style={h3Style}>Daily Review</h3>
          <p style={pStyle}>
            Щодня алгоритм формує набір карток для повторення:
          </p>
          <ul style={listStyle}>
            <li>Картки, які "дозріли" — минув їхній інтервал повторення</li>
            <li>До 40 нових карток на день (щоб пройти всю базу за ~10 днів)</li>
            <li>Порядок перемішується для кращого запам'ятовування</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div style={{ ...sectionStyle, marginBottom: 40 }}>
          <div style={iconWrap}>
            <span style={emojiStyle}>6</span>
          </div>
          <h3 style={h3Style}>Статуси карток</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <StatusRow color="var(--success)" label="Вивчено" desc="Інтервал > 1 дня, знання закріплене" />
            <StatusRow color="var(--accent)" label="В процесі" desc="Картка розпочата, але ще не закріплена" />
            <StatusRow color="var(--danger)" label="Важка" desc="3+ помилки, потребує додаткової уваги" />
            <StatusRow color="var(--text-secondary)" label="Нова" desc="Ще не показувалась" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineStep = ({ label, interval, isLast }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 4 }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        backgroundColor: 'var(--accent)', flexShrink: 0
      }} />
      {!isLast && <div style={{ width: 2, height: 24, backgroundColor: 'var(--border)' }} />}
    </div>
    <div style={{ paddingBottom: isLast ? 0 : 16 }}>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 8 }}>{interval}</span>
    </div>
  </div>
);

const StatusRow = ({ color, label, desc }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
    <div>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 6 }}>— {desc}</span>
    </div>
  </div>
);

const sectionStyle = {
  backgroundColor: 'var(--panel-color)',
  borderRadius: 16,
  padding: 20,
  marginBottom: 16,
};

const iconWrap = {
  width: 32,
  height: 32,
  borderRadius: 10,
  backgroundColor: 'var(--accent)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 12,
};

const emojiStyle = {
  fontSize: 16,
  fontWeight: 800,
  color: '#fff',
};

const h3Style = {
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 6,
};

const pStyle = {
  fontSize: 15,
  lineHeight: 1.5,
  color: 'var(--text-secondary)',
};

const chipStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  padding: '10px 16px',
  borderRadius: 12,
  border: '2px solid',
  backgroundColor: 'var(--bg-color)',
};

const highlightBox = {
  marginTop: 12,
  padding: '10px 14px',
  borderRadius: 10,
  backgroundColor: 'var(--bg-color)',
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--danger)',
};

const timelineStyle = {
  marginTop: 12,
};

const listStyle = {
  marginTop: 8,
  paddingLeft: 20,
  fontSize: 14,
  lineHeight: 1.8,
  color: 'var(--text-secondary)',
};
