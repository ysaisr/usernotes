import React, { useState } from 'react';
import './Design.css';

function Design({ closeDesign, addGroup }) {

  const handleBackgroundClick = (e) => {
    if (e.target.className === 'Design-background') {
      closeDesign();
    }
  };

  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleCreate = () => {
    if (groupName && selectedColor) {
      addGroup(groupName, selectedColor);
    }
  };

  return (
    <div className="Design-background" onClick={handleBackgroundClick}>
      <div className="Design-container">
        <h2>Create New Group</h2>
        <div className='name'>
          <p>Group Name</p>
          <input 
            type="text" 
            placeholder=" Enter group name " 
            value={groupName} 
            onChange={(e) => setGroupName(e.target.value)} 
          />
        </div>
        <div className="color-selection">
          <div className="color-options">
          <p>Choose colour</p>
            {['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'].map((color) => (
              <div 
                key={color} 
                className="color-circle" 
                style={{ backgroundColor: color }} 
                onClick={() => setSelectedColor(color)} 
              />
            ))}
          </div>
        </div>
        <button className="create-button" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default Design;