import React, { useState, useEffect } from 'react';
import vector from '../images/vector.png';
import './GroupPage.css';

function GroupPage({ selectedGroup, updateGroupNotes, onBackToSidebar }) {
  const [notes, setNotes] = useState(selectedGroup.notes || []);
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    setNotes(selectedGroup.notes || []);
    setMessage('');
  }, [selectedGroup]); 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (message.trim()) {
        const newNote = {
            text: message,
            timestamp: new Date().toLocaleString(), 
        };
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        updateGroupNotes(selectedGroup.Name, updatedNotes);
        setMessage("");
    }
  };

  return (
    <div className='group-page'>
      <div className='navbar'>
        {isMobile && (
          <div className='back-arrow' onClick={onBackToSidebar}>
            &#8592; 
          </div>
        )}
        <div  className='group-icon'  style={{ backgroundColor: selectedGroup.color}}>
          {selectedGroup.initials}
        </div>
        <h2>{selectedGroup.Name}</h2>
      </div>
      <div className="group-content">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <p>{note.text}</p>
            <span>{note.timestamp}</span>
          </div>
        ))}
      </div>
      <div className='text-container'>
        <textarea
          className='message-input'
          value={message}
          placeholder='Type your message here...'
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSendClick();
              e.preventDefault();
            }
          }}
        />
          <button className='send' onClick={handleSendClick} disabled={!message.trim()}>
            <img src={vector} alt='send-button'/>
          </button>
      </div>
    </div>
  );
}

export default GroupPage;