import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Welcome</h1>
                <Routes>
                    <Route path="/upload" element={<FileUpload />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;