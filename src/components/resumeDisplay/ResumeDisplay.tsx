import type { ResumeData } from "./types";
import "./ResumeDisplay.css";
import React from "react";

export interface ResumeDisplayProps {
  resume: ResumeData;
}

export const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ resume }) => {
  return (
    <>
      <div
        className="resume-display"
        style={{ padding: "16px", backgroundColor: "#fff", borderRadius: 8 }}
      >
        <h2>
          {resume.firstName} {resume.lastName}
        </h2>

        {resume.summary && (
          <>
            <h3>Summary</h3>
            <p>{resume.summary}</p>
          </>
        )}

        {resume.experience && resume.experience.length > 0 && (
          <>
            <h3>Work Experience</h3>
            {resume.experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <strong>{exp.position}</strong> at <em>{exp.company}</em>{" "}
                {exp.period && `(${exp.period})`}
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
