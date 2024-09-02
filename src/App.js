import React, { useState, useEffect } from 'react';
import bg from './images/bg.png';
import Design from './components/Design';
import GroupPage from './components/GroupPage';
import './App.css';

function App() {
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem("groups")) || []);
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  const openDesign = () => {
    setIsDesignOpen(true);
  };

  const closeDesign = () => {
    setIsDesignOpen(false);
  };

  useEffect(() => {
		localStorage.setItem("groups", JSON.stringify(groups));
	}, [groups]);

  const addGroup = (Name, color) => {
    let initials;
    const words = Name.split(' ');

    if (words.length === 1) {
      initials = words[0].substring(0, 2).toUpperCase();
    } else {
      initials = words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }

    const newGroup = { Name, color, initials, notes: [] };
    setGroups([...groups, newGroup]);
    closeDesign();  
  };

  const openGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const updateGroupNotes = (groupName, notes) => {
    const updatedGroups = groups.map(group => 
      group.Name === groupName ? { ...group, notes } : group
    );
    setGroups(updatedGroups);
  };

  return (
    <div className={`app ${selectedGroup ? 'group-selected' : ''}`}>
      <div className="sidebar">
        <h2>Pocket Notes</h2>
        <ul className='group-list'>
          {groups.map((group, index) => (
            <li 
              key={index}  
              className='group-item' 
              style={{ borderleft: `4px solid ${group.color}`}}
              onClick={() => openGroupClick(group)}
              >
              <div className='group-icon'  style={{ backgroundColor: group.color}}>
                {group.initials}
              </div>
              <span style={{fontSize:'20px', paddingBottom:'3px'}}>{group.Name}</span>
            </li>
          ))}
        </ul>
        <div className="add-button"  onClick={openDesign} >+</div>
      </div>
      {selectedGroup ? (
        <GroupPage 
          selectedGroup={selectedGroup}
          updateGroupNotes={updateGroupNotes} />
      ) : (
        <div className="main-content">
          <div className="noteimg">
            <img src={bg} alt="noteimg" /> 
          </div>
          <div className="text-content">
            <h1>Pocket Notes</h1>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          </div>
          <div className="end-text">
            <p>🔒 end-to-end encrypted</p>
          </div>
        </div>
      )}
      {isDesignOpen && <Design closeDesign={closeDesign} addGroup={addGroup} />}
    </div>
  );
}

export default App;
