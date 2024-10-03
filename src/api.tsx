//Define the base URL for API
export const BASE_URL = 'http://3.27.122.31';

//Endpoints

//Units
export const POST_UNIT = `${BASE_URL}/units`; 
export const GET_UNITS = `${BASE_URL}/units`;  
export const DELETE_UNIT = (unitCode: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}`; 
export const UPDATE_UNIT = (unitCode: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}`; 

//Projects
export const POST_PROJECT = (unitCode: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects`;
export const GET_PROJECTS = (unitCode: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects`;
export const DELETE_PROJECT = (unitCode: string, projectName: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects/${encodeURIComponent(projectName)}`;
export const UPDATE_PROJECT = (unitCode: string, projectName: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects/${encodeURIComponent(projectName)}`; 

//Questions
export const POST_QUESTION_TEMPLATE = (unitCode: string, projectName: string) => 
    `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects/${encodeURIComponent(projectName)}/template`;  
export const GET_QUESTIONS_TEMPLATE = (unitCode: string, projectName: string) => 
    `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects/${encodeURIComponent(projectName)}/template`; 
export const GET_QUESTION_BANK = (unitCode: string, projectName: string) => 
    `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects/${encodeURIComponent(projectName)}/question_bank`; 
export const POST_QUESTION_BANK = (unitCode: string, projectName: string) => 
    `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects/${encodeURIComponent(projectName)}/question_bank`; 
 export const GENERATE_ALL_QUESTIONS = (unitCode: string, projectName: string) => 
    `${BASE_URL}/units/${encodeURIComponent(unitCode)}/projects/${encodeURIComponent(projectName)}/generate_questions`; 

//Rubric Creation

//Students
export const POST_STUDENTS = (unitCode: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}/students`; 
export const GET_STUDENTS_LIST = (unitCode: string) => 
    `${BASE_URL}/units/${encodeURIComponent(unitCode)}/students`; 

//TA
export const POST_TA = (unitCode: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}/collaborators`; 
export const GET_ALL_TA = (unitCode: string) => `${BASE_URL}/units/${encodeURIComponent(unitCode)}/collaborators`; 