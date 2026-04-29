import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Teacher from "./routes/Teacher";
import NotFound from "./routes/NotFound";
import TeacherPosition from "./routes/TeacherPosition";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/teacher" />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/teacher-position" element={<TeacherPosition />} />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;