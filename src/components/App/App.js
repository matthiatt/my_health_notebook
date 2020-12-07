import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

//for calendar component
import React, { Component } from 'react';
import Scheduler from './components/Scheduler';
import './App.css';
// import Toolbar from './components/Toolbar';
// import MessageArea from './components/MessageArea'

//original code that was here vv
// const App = ({ children }) => (
//   <>
//     <Header />

//     <main>
//       {children}
//     </main>

//     <Footer />
//   </>
// );

// export default App;


//start of code for calendar component
const data = [];

class App extends Component {
state = {
    currentTimeFormatState: true,
    messages: []
};

addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [
        newMessage,
        ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
        messages.length = maxLogLength;
    }
    this.setState({ messages });
}

logDataUpdate = (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : '';
    const message = `event ${action}: ${id} ${text}`;
    this.addMessage(message);
}

render() {
    const { currentTimeFormatState, messages } = this.state;
    return (
        <div>
            <div className="tool-bar">
                <Toolbar
                    timeFormatState={currentTimeFormatState}
                    onTimeFormatStateChange={this.handleTimeFormatStateChange}
                />
            </div>
            
            <div className='scheduler-container'>
                <Scheduler
                    events={data}
                    timeFormatState={currentTimeFormatState}
                    onDataUpdated={this.logDataUpdate}
                />
            </div>
            {/* messages section that displays what you saved or deleted */}
            {/* <MessageArea
                messages={messages}
            /> */}
        </div>
    );
}
}
export default App;
